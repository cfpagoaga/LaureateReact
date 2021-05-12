import http from "../http-common";

class StudentService {
  getAll() {
    return new Promise((resolve, reject) => {
      http.get("/student").then(data => {
        return resolve(data.data);
      }).catch( error=>{
          return reject(error);
        }
      );
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      http.get(`/student/${id}`).then(data => {
        return resolve(data.data);
      }).catch( error=>{
          return reject(error);
        }
      );
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
        http.post('/student',data).then(response=>{
          return resolve(response);
        })
        .catch(error =>{
          return reject(error);
        })
    });
  }

  update(id, data) {
    return new Promise((resolve, reject) => {
      http.put(`/student/${id}`,data).then(response=>{
        return resolve(response);
      })
      .catch(error =>{
        return reject(error);
      })
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      http.delete(`/student/${id}`).then(response=>{
        return resolve(response);
      })
      .catch(error =>{
        return reject(error);
      })
    });
  }
}

export default new StudentService();