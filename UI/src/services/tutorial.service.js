import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/matchstats");
  }

  get(id) {
    return http.get(`/matchstats/${id}`);
  }

  create(data) {
    return http.post("/matchstats", data);
  }

  update(id, data) {
    return http.put(`/matchstats/${id}`, data);
  }

  delete(id) {
    return http.delete(`/matchstats/${id}`);
  }

  deleteAll() {
    return http.delete(`/matchstats`);
  }

  findByTitle(title) {
    return http.get(`/matchstats?title=${title}`);
  }
}

export default new TutorialDataService();