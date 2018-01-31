#!/usr/bin/env python
from __future__ import print_function
from threading import Thread, RLock, Lock
import os
import sys
import time
from subprocess import Popen, STDOUT

# Need a universal print lock
PRINT_LOCK = Lock()

class Msg(object):

    def __init__(self, prefix, msg, prefix_color='reset', msg_color='reset', keyframes=[0.3, '', '.', '..', '...']):
        super(Msg, self).__init__()
        self._prefix = prefix
        self._msg = msg
        self._msg_color = msg_color
        self._prefix_color = prefix_color
        self._keyframes = keyframes

    @property
    def msg(self):
        return Msg.colorize(self._msg, self._msg_color)

    @property
    def prefix(self):
        return Msg.colorize(self._prefix, self._prefix_color)

    @property
    def keyframes(self):
        return self._keyframes

    def recolor(self, prefix_color=None, msg_color=None, override=True):
        if prefix_color != None and (override or self._prefix_color == 'reset'):
            self._prefix_color = prefix_color
        if msg_color != None and (override or self._msg_color == 'reset'):
            self._msg_color = msg_color
        return self

    def fmt(self, prefix_fmt='{prefix}', msg_fmt='{msg}'):
        return Msg(prefix_fmt.format(prefix=self._prefix),
                      msg_fmt.format(msg=self._msg),
                      prefix_color=self._prefix_color,
                      msg_color=self._msg_color
                     )
    
    def __repr__(self):
        return self.prefix + self.msg

    @staticmethod
    def color(color):
        return {
            'black': '\x1b[30m',
            'red': '\x1b[31m',
            'green': '\x1b[32m',
            'yellow': '\x1b[33m',
            'blue': '\x1b[34m',
            'magenta': '\x1b[35m',
            'cyan': '\x1b[36m',
            'white': '\x1b[37m',
            'reset':'\x1b[0m'
        }[color]

    @staticmethod
    def colorize(msg, clr):
        return '{color}{msg}\x1b[0m'.format(**{ 'color': Msg.color(clr), 'msg': msg })



class Tag(object):


    def __init__(self, tag_id, tag_line, color):
        super(Tag, self).__init__()
        self._lock = RLock()
        self._id = tag_id
        self._line = tag_line
        self._color = color


    @property
    def line(self):
        return self._line

    @property
    def lock(self):
        return self._lock

    @property
    def id(self):
        return self._id

    @property
    def color(self):
        return self._color



class Logger(object):


    def __init__(self, prefix_fmt='{prefix:<16}| '):
        super(Logger, self).__init__()
        self._log_line = 0
        self._tags = {}
        self._next_color = 0
        self._prefix_fmt = prefix_fmt


    def tag(self, tag_id):
        self._tags[tag_id] = Tag(tag_id, self._log_line, self.next_color())
        return self


    def next_color(self):
        all_colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan']
        color = all_colors[self._next_color]
        self._next_color = (self._next_color + 1) % len(all_colors)
        return color

    @staticmethod
    def is_alive(proc_or_thread):
        proc_or_thread_t = type(proc_or_thread)
        if proc_or_thread_t is Popen:
            return proc_or_thread.poll() is None
        elif proc_or_thread_t is Thread:
            return proc_or_thread.is_alive()
        else:
            raise Exception('Cannot wait on type {}, must be Popen or Thread'.format(proc_or_thread_t))

    @staticmethod
    def _wait(logger, tag_id, msg, proc):
        tag = logger._tags[tag_id]
        with tag.lock:
            keyframes = msg.keyframes[1:]
            delay = msg.keyframes[0]

            i = 0
            while Logger.is_alive(proc):
                new_msg = msg.fmt(msg_fmt='{msg}'+keyframes[i])
                logger.log(new_msg, tag_id)
                i = (i + 1) % len(keyframes)
                time.sleep(delay)


    def wait(self, tag_id, msg, process):
        if tag_id in self._tags.keys():
            Thread(target=Logger._wait, args=(self, tag_id, msg, process)).start()


    def log(self, msg, tag_id=None):
        tag = None
        if tag_id != None:
            if tag_id in self._tags.keys():
                tag = self._tags[tag_id]
            else:
                return self
        # Get access to tag, then print
        # print(msg)
        line = None
        if tag != None:
            tag.lock.acquire()
            line = tag.line
        else:
            line = self._log_line

        PRINT_LOCK.acquire()

        if line < self._log_line:
                print('\033[F' * (self._log_line - line), end='')
        else:
            self._log_line += 1

        new_msg = msg.fmt(prefix_fmt=self._prefix_fmt)
        if tag != None:
            new_msg.recolor(prefix_color=tag.color, override=False)
        print('\033[K{prefix} {msg}'.format(prefix=new_msg.prefix, msg=new_msg.msg))
        
        # Move cursor to bottom and adjust log offset
        dist_to_bottom = self._log_line - line - 1
        if dist_to_bottom >= 0:
            print(''.join(['\n' for n in range(dist_to_bottom)]), end='')
        else:
            self._log_line -= dist_to_bottom

        PRINT_LOCK.release()
        if tag != None:
            tag.lock.release()
        return self

if __name__ == '__main__':
    l = Logger()
    l.tag('tag_a').log(Msg('test1', 'a'))
    l.tag('tag_b').log(Msg('test1', 'b'))
    l.log(Msg('test1', 'c', prefix_color='red', msg_color='green'), tag_id='tag_a')
    l.log(Msg('test1', 'd', prefix_color='green', msg_color='blue'), tag_id='tag_b')

    process = Popen(['sleep', '6'])
    l.wait('tag_b', Msg('test2', 'Testing wait functionality'), process)
    process.wait()
    if process.returncode != 0:
        l.log(Msg('test2', 'Exited with nonzero code: {}'.format(process.returncode), msg_color='red'), tag_id='tag_b')
    else:
        l.log(Msg('test2', 'Done.', msg_color='green'), tag_id='tag_b')











