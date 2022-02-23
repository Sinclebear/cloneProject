const util = {
  success: (status, message, data) => {
    return {
      status: status,
      success: true,
      message: message,
      data: data,
    };
  },
  fail: (status, message) => {
    return {
      status: status,
      success: false,
      message: message,
    };
  },
};

const user = {
  uploadImage: async (req, res) => {
    
    let image_url = [];

    for(let i = 0 ; i<5 ; i++){
      console.log("location : ", req.files[i].location);

      image_url[i] = req.files[i].location;
      console.log(image_url[i]);
    }
    
    

    if (image_url === undefined) {
      return res
        .status(400)
        .send(util.fail(400, '이미지가 존재하지 않습니다.'));
    }
    // res.status(200).send(util.success(200, '요청 성공', image));
    res.status(200).json({ imgurl: image_url });
  },
};

module.exports = user;