module.exports = {
  friendlyName: "Create page pro",

  description: "",

  inputs: {
    model: { type: "string", required: true },
    type: { type: "string", isIn: ["default", "onlyView"] },
  },

  exits: {},

  fn: async function (inputs, exits) {
    try {
      let { model, type } = inputs;
      // let modelAttribute = sails.models[model].attributes;
      // let pageInfoView = {
      //   name : model,
      //   apis: [],
      //   buttons: [],
      //   form: [],
      //   grid: [],
      //   submit: "",
      //   roles: [],
      //   read: "find",
      //   name: model,
      //   procedures: [],
      //   schema : []
      // };
      // let a = JSON.parse(`[{"name":"id","width":"70","field":"id","type":"number","filterable":true},{"name":"Tên sách","field":"name","type":"string","filterable":true},{"name":"Thể loai","field":"categoryId","type":"number","modelSelect":true,"modelSelectApi":"get-category","filterable":true},{"name":"Nhà cung cấp","type":"number","field":"providerId","filterable":true,"modelSelect":true,"modelSelectApi":"get-provider"},{"name":"Nhà xuất bản","field":"publisherId","type":"number","filterable":true,"modelSelect":true,"modelSelectApi":"get-publisher"},{"name":"Tác giả","type":"number","field":"authorId","filterable":true,"modelSelect":true,"modelSelectApi":"get-author"},{"name":"Giá","field":"price","type":"number","filterable":true},{"name":"Miêu tả","field":"description","type":"string","filterable":true},{"name":"Số trang","field":"numberOfPage","type":"number","filterable":true},{"name":"Ảnh","field":"images","type":"string","display":"image","filterable":false},{"name":"Kích hoạt","field":"isActive","type":"number","enumable":true,"items":[{"key":"Có","value":"1"},{"key":"Không","value":"0"}]},{"name":"Tỉ lệ khuyến mại","field":"percentDiscount","type":"number","filterable":true}]`)
      // console.log(a)
      // pageInfoView.apis.push(createApi("GET", "find", "find", `/api/${model}`));
      // for (var i in modelAttribute) {
      //   console.log(i);
      //   //create grid
      //   let tempGrid = {};
      //    tempGrid.name = i;
      //    tempGrid.field = i;
      //    tempGrid.type = "";
      //    tempGrid.filterable = true
      //   switch (modelAttribute[i].type) {
      //     case "number": {
      //       if (i == "createdAt" || i == "updatedAt") {
      //         tempGrid.type = "date";
      //         break;
      //       }
      //       tempGrid.type = "number";
      //       break;
      //     }
      //     case "string": {
      //       if(i == "image" || i =="images") {
      //         tempGrid.display = "image";
      //         tempGrid.filterable = false;
      //       }
      //       tempGrid.type = "string"
      //       break;
      //     }
      //   };
      //   pageInfoView.grid.push(tempGrid);
      // }
      // console.log(pageInfoView.grid);
      // await Page.create(pageInfoView);
      let pageInfoForm = {
        name : "Chi tiết"  + model,
        apis: [],
        buttons: [],
        form: [],
        grid: [],
        submit: "",
        roles: [],
        read: "find",
        name: model,
        procedures: [],
        schema : []
      };
      pageInfoForm.apis.push(createApi("GET", "find", "find", `/api/${model}`));
      pageInfoForm.apis.push(createApi("POST", "create", "create", `/api/${model}`));
      pageInfoForm.apis.push(createApi("PATCH", "update", "update", `/api/${model}`));
      return exits.success({
        code: 0,
        message: "Thành công",
      });
    } catch (error) {
      return exits.success({
        code: 0,
        message: error,
      });
    }
  },
};
createApi = (method, name, type, url) => {
  let temp = {
    method,
    name,
    type,
    url,
    requestFields: "",
    responseFields: "",
  };
  return temp;
};
