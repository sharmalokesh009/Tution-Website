import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function Assignment(props) {
  const [loading, setloading] = useState(true);

  function handlechange(e) {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    formdata.append("rollno", 11801092);
    formdata.append("group", "4CE-3");
    formdata.append("subject", props.Subject);
    formdata.append("title", props.Title);
    formdata.append("Id", props.id);
    formdata.append("submissiondate", props.SubmissionDate);
    formdata.append("type", props.Type);
    formdata.append('array' , props.array)

    async function postdata() {
      try {
        setloading(false);
        await axios
          .post("http://localhost:5000/upload", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            setloading(true);
          });
      } catch (err) {
        console.log(err);
      }
    }
    postdata();
  }

  return (
    <div>
      {loading ? (
        <div className="assignment-list-container">
          <br />

          <div className="list">
            <div id="list-item" className="list-item">
              <div className="chapterandtime">
                <div>
                  <h2>{props.Subject}</h2>
                  <p>{props.Title}</p>
                  <h4>{props.Type}</h4>
                </div>
                <h4 className="time">
                  Submission Date :<p>{props.SubmissionDate}</p>
                </h4>
              </div>
              <input
                type="file"
                onChange={handlechange}
                id={`${props.index}-upload`}
                hidden
              />
              <label
                className="upload"
                id={`${props.index}`}
                htmlFor={`${props.index}-upload`}
              >
                Upload
              </label>
              <br />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
