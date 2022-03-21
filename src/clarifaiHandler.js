export const getClarifaiData = (imageUrl) => {
    const raw = JSON.stringify({
        "user_app_id": {
              "user_id": "171dkwqu023b",
              "app_id": "b48a739f82a6480bbfeb47b37176b72b"
          },
        "inputs": [
          {
            "data": {
              "image": {
                "url": imageUrl,
              }
            }
          }
        ]
      });
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key 731a23c6e6534c138b1f3524cf7f9627'
        },
        body: raw
      };
      
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
        .then(response => JSON.parse(response.text(), null, 2))
        .then(result => {
          console.log(result.outputs[0].data.regions[0].region_info.bounding_box)})
        .catch(error => console.log('error', error));
}