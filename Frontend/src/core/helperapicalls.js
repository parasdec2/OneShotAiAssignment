import { API } from "../backend";

export const getStats = async () => {
  return fetch(`${API}/home`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // console.log("RESPONE DATA", response);

      return response.json();
    })
    .catch((err) => {
      console.log("ERROR", err);
      //   return err.json();
    });
};

export const getCollegesByState = async (data) => {
  //   const data = {
  //     state: state,
  //   };
  console.log(data);
  return fetch(`${API}/colleges/state`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // console.log("RESPONE DATA", response);

      return response.json();
    })
    .catch((err) => {
      console.log("ERROR", err);
      //   return err.json();
    });
};

export const getCollegesByStream = async (data) => {
  return fetch(`${API}/colleges/course`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // console.log("RESPONE DATA", response);

      return response.json();
    })
    .catch((err) => {
      console.log("ERROR", err);
      //   return err.json();
    });
};

export const getCollege = async (collegeId) => {
  return fetch(`${API}/college/${collegeId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // console.log("RESPONE DATA", response);

      return response.json();
    })
    .catch((err) => {
      console.log("ERROR", err);
      //   return err.json();
    });
};

export const getStudentById = async (studentId) => {
  return fetch(`${API}/student/${studentId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // console.log("RESPONE DATA", response);

      return response.json();
    })
    .catch((err) => {
      console.log("ERROR", err);
      //   return err.json();
    });
};
