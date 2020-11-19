module.exports = {


    friendlyName: 'Check Logfile',
  
  
    description: 'Kiểm tra xem trong chuỗi có dấu |',
  
  
    inputs: {
        str:{type:'string'}
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
      fail: {
  
      }
  
    },
  sync: true,
  
    fn:  function (inputs, exits) {
      let { str} = inputs;
      if (!str) return str;
      return exits.success(str.replace(/\|/g, ''));
    }
  
  
  };
  
  