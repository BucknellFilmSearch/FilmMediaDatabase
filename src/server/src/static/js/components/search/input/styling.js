
const InputPanel = {
  tab: {
    container: {
      textAlign: 'center'
    },
    div: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    filter: {
      display: 'flex',
      justifyContent: 'center',
      width: '80%',
      textAlign: 'center',
      alignItems: 'middle',
      marginBottom: '0px',
      marginTop: '12px'
    }
  },
  slider: {
    component: {
      height: '30px',
      width: '70%',
      marginBottom: '0px',
      display: 'inline-block'
    },
    description: {
      marginTop: '8px',
      marginRight: '16px',
      marginBottom: '0px',
      width: '30%'
    }
  },
  input: {
    top: '8px',
    width: '90%'
  },
  dropdown: {
    top: '-4px',
    float: 'left'
  },
  button: {
    float: 'center',
    marginBottom: 8
  },
  dropzone: {
    component: {
      width: '350px',
      height: '250px',
      border: '1.5px dashed #ccc',
      borderRadius: '5px',
      background: '#fafafa',
      cursor: 'pointer'
    },
    icon: {
      width: '48px',
      height: '48px'
    }
  }
};

export {
  InputPanel
};
