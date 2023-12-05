async function call({ uri, method = "GET", body = undefined }) {
  return fetch(`http://127.0.0.1:8009/api/v1/${uri}`, {
    headers: {
      "Content-type": "application/json",
      "x-acces-token": localStorage.getItem("token"),
    },
    method,
    body: JSON.stringify(body),
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw { error: { msg: "No autorizado" } };
      }
      else {
        throw await response.json();
      }
    }
  });
}

export default {
    call
}

export {
    call
}
