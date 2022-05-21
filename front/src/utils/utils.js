const objToFormData = (obj) => {
    const formData = new FormData();
    for (const objKey in obj) {
        if (obj[objKey] instanceof Array){
            for (const item of obj[objKey]) {
                formData.append(objKey, item);
            }
        }else formData.append(objKey, obj[objKey]);
    }
    return formData;
}

const getQueryString = (params) => {
  const qs = new URLSearchParams();
  for (const paramsKey in params) {
      qs.append(paramsKey, params[paramsKey]);
  }
  return qs.toString();
}

/*const showToast = (obj) => {
    let ele = document.getElementById("a-tips-toast");
    if (ele)ele.outerHTML="";
  document.body.innerHTML+=`
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="a-tips-toast">
  <div class="toast-header">
    <strong class="me-auto">${obj.title}</strong>
    <small>${obj.tips}</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    ${obj.msg}
  </div>
</div>
  `
    ele=document.getElementById("a-tips-toast");
  const toast = new bootstrap.Toast(ele);
  toast.show();
}*/

export {objToFormData, getQueryString, };