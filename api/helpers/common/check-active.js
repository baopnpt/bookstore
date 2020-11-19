module.exports = {


  friendlyName: 'Check active',


  description: '',


  inputs: {
    id : {
      type : 'number',
      description : 'id của voucher'
    },
    campaign: {
      type: 'number',
      description: 'Check voucher có đang trong chiến dịch không'
    },
    limitProgram: {
      type: 'number',
      description: 'số lượng chương trình giới hạn cho voucher '
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    fail: {

    }

  },


  fn: async function (inputs, exits) {
    let { campaign, limitProgram,id } = inputs;
    try {
      if (!campaign && limitProgram > 0) {
        let rs = await Code.count({ voucher: id })
        if (rs >= limitProgram)
          await Voucher.updateOne({ id }).set({ active: 0 });
      }
      return exits.success({
        messages : 'success'
      })
    } catch (err) {
      return exits.fail({
        messages : 'fail'
      })
    }
  }


};

