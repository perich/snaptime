const xhr = {
  handleSuccess: function (data) {
    console.log('XHR successful');
    console.log(data);
  },

  handleError: function (obj, text, error) {
    console.log('XHR error');
    console.log(error);
  },

  getNewUrl: function (hostSignalObj) {
    return $.ajax({
      type: 'POST',
      url: `${serverUrl}/generateUrl`,
      data: JSON.stringify(hostSignalObj),
      contentType: 'application/json',
      dataType: 'json'
    });
  }
};