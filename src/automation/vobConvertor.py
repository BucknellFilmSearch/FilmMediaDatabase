__author__ = 'Sarah Xu'

import os
import subprocess
from automationUtil import hasNumbers

import tkFileDialog
from Tkinter import *

def merge_convert_vob(drivepath):
    """
    This program goes through all directories in the hard drive,
    if the vob files are not yet merged and converted to mp4,
    it merges them and convert them.
    The resulted vob file is stored in the original folder
    and named as merged.VOB
    The resulted mp4 file is stored in 
    [hard drive]:/0_The Cell Phone Cinema Project/src/CPCPModel/
    static/videoFiles/[oclc_id_of_movie] and named VTS_0.mp4
    :param moviepath: 
    :return: 
    """
    file_count = 0
    vob_count = 0
    for i in os.listdir(drivepath):
        vob_list = []
        if (i == '$RECYCLE.BIN' or i == 'System Volume Information' or i == '.Trash-1000' or i == '0_The Cell Phone Cinema Project'):
            continue
        print(i)
        file_count += 1
        # print file_count

        # Step 1: find the right list of VOB's
        moviepath = drivepath + "/" + i + "/VIDEO_TS/"
        if not has_mp4(moviepath):
            try:
                vob_list = _find_vob(moviepath)
                vob_count += 1
                # print vob_count
            except:
                print("The exception is " + i)
                lowerpath = drivepath + "/" + i + "/"
                # handling unexpected file structure, try to find the VIDEO_TS folder location
                for j in os.listdir(lowerpath):
                    if j == "VIDEO_TS":
                        vob_list = _find_vob(lowerpath + j + '/')
                        moviepath = lowerpath + j + '/'
                        #vob_count += 1
                        continue
                    else:
                        if os.path.isdir(lowerpath + j + '/'):
                            for n in os.listdir(lowerpath + j + '/'):
                                if n == "VIDEO_TS":
                                    vob_list = _find_vob(lowerpath + j + '/' + n + '/')
                                    moviepath = lowerpath + j + '/' + n + '/'
                                    #vob_count += 1
                                else:
                                    print("ERROR: No VIDEO_TS folder found")
                                    print("Please manually merge and convert the vob files for " + i)

            # step 2: merge the VOB's
            if not has_merged_vob(moviepath):
                print "Merging the VOB files"
                _merge_vob(vob_list, moviepath)

            # step 3: convert to mp4
            _vob_to_mp4(moviepath)


    print "total number of movies in drive: " + str(file_count)
    print "total movies waiting for conversion " + str(vob_count)


def has_mp4(moviepath):
    for i in os.listdir(moviepath):
        if "mp4" in i:
            return True

    return False

def has_merged_vob(moviepath):
    for i in os.listdir(moviepath):
        if "merged.VOB" in i:
            return True

    return False


def _find_vob(moviepath):
    """
    Find the correct set of vob files.
    The set of VOB files needed is the set VTS_#_(1-n)
    where n is the largest such n in the directory
    :param moviepath: the path containing the vob files
    :return: 
    """
    max = 0
    vob_list = []
    for i in os.listdir(moviepath):
        if i != "VTS_0.vob" and ("VOB" in i or "vob" in i) and hasNumbers(i):
            vob_list.append(i)
            vob_name = (i.replace(".", "_")).split("_")
            # print(vob_name)
            if int(vob_name[2]) > max:
                max = int(vob_name[2])
                cur = vob_name[1]
    result = []
    for i in vob_list:
        vob_name = (i.replace(".", "_")).split("_")
        if vob_name[1] == cur and vob_name[2] != "0":
            result.append(i)
    print result
    return result


def _merge_vob(vob_list, moviepath):
    """
    Merge the correct vob files into one larger file 
    using the "cat" command.
    The merged vob file is name as "merged.VOB"
    :param moviepath: the path containing the vob files
    :return: 
    """
    os.chdir(moviepath)
    # vob_list = _find_vob(moviepath)
    cmd = ["cat"]
    cmd = cmd + vob_list
    with open("merged.VOB", "w") as out:
        p = subprocess.Popen(cmd, stdout=out)
        std_out, err = p.communicate()


def _vob_to_mp4(moviepath):
    """
    Finds the merged vob file and convert into an mp4 file
    for easy processing
    :param moviepath: 
    :return: 
    """
    os.chdir(moviepath)
    found = False
    cmd_str = "ffmpeg -i merged.VOB -c:v libx264 -c:a aac -strict experimental VTS_0.mp4"
    for i in os.listdir(moviepath):
        if i == "merged.VOB":
            found = True
            p = subprocess.Popen(cmd_str, shell=True)
            out, err = p.communicate()

    if not found:
        print "ERROR: please merge the vob files and name it to merged.VOB"


def gui():

    def button_hd_callback():
        """ What to do when the Browse button is pressed """
        filename = tkFileDialog.askdirectory(initialdir='.')
        hdEntry.delete(0, END)
        hdEntry.insert(0, filename)

    def button_start_callback():
        indir = hdEntry.get()
        merge_convert_vob(indir)


    root = Tk()
    frame = Frame(root)
    frame.pack()

    statusText = StringVar(root)
    statusText.set("Please select the film hard drive location")

    hardDriveLabel = Label(root, text="Hard Drive Location: ")
    hardDriveLabel.pack()
    hdEntry = Entry(root, width=50)
    hdEntry.pack()
    button_hd = Button(root,
                           text="Browse for hard drive",
                           command=button_hd_callback)
    button_hd.pack()
    separator = Frame(root, height=2, bd=1, relief=SUNKEN)
    separator.pack(fill=X, padx=5, pady=5)

    button_start = Button(root,
                         text="Start",
                         command=button_start_callback)
    button_start.pack()

    button_exit = Button(root,
                         text="Exit",
                         command=sys.exit)


    button_exit.pack()

    separator = Frame(root, height=2, bd=1, relief=SUNKEN)
    separator.pack(fill=X, padx=5, pady=5)

    message = Label(root, textvariable=statusText)
    message.pack()

    mainloop()

if __name__ == "__main__":
    """ Run as a stand-alone script """
    gui()

    # parser = get_parser()       # Start the command-line argument parsing
    # args = parser.parse_args()  # Read the command-line arguments
    #
    # if args.input:              # If there is an argument,
    #     command_line(args)      # run the command-line version
    # else:
    #     gui()                   # otherwise run the GUI version

# moviepath = "/media/sarah/Seagate Exp/40462631_MY_DINNER_WITH_ANDRE/VIDEO_TS"
# _merge_vob(moviepath)
# _vob_to_mp4(moviepath)
