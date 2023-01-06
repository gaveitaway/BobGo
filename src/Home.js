import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./components/Popup";
import "./css/Home.css";
import "./App.js";
import "./result.js";

async function len_validation(url_list) {
  var valid = -1;
  for (var i = 0; i < url_list.length; i++) {
    if (url_list[i].length === 0) {
      valid = i + 1;
    }
    if (i === url_list.length - 1) {
      return valid;
    }
  }
}

async function format_validation(url_list) {
  let eta_regex = /^https:\/\/everytime.kr\/@/;
  var valid = -1;
  for (var i = 0; i < url_list.length; i++) {
    // console.log(url_list[i]);
    if (eta_regex.test(String(url_list[i])) === false) {
      valid = i + 1;
    }
    if (i === url_list.length - 1) {
      return valid;
    }
  }
}

function Home() {
  let navigator = useNavigate();

  const [popup, setPopup] = useState(true);
  const [peopleCount, setPeopleCount] = useState(1);
  const [takeUrl, setTakeUrl] = useState([
    <>
      <input
        type="text"
        placeholder="에브리타임 시간표 공유 링크를 입력해주세요"
        name="1"
        id="1"
        class="u-input u-input-rectangle u-radius-12 .u-grey-light-1 u-input-1"
        required=""
      ></input>
      <br />
    </>,
  ]);

  return (
    <>
      <div class="App">
        <div class="u-clearfix u-valign-top u-section-1" id="carousel_1834">
          <div class="u-container-style u-expanded-width u-group u-palette-5-light-2 u-shape-rectangle u-group-1">
            <div class="u-container-layout u-container-layout-1">
              <h1 class="u-align-center u-custom-font u-font-merriweather u-text u-text-default u-text-1">
                BOB-GO
              </h1>
              <h4 class="tex123">
                에브리타임 시간표 링크를 입력해 시간표를 ​비교해보세요 !
              </h4>

              <div>{takeUrl}</div>

              <div class="u-align-center u-form-group u-form-submit">
                <input
                  type="button"
                  className="button123"
                  value={" = 밥고 시간 찾기 = "}
                  onClick={async (event) => {
                    var urls = [];
                    for (var i = 1; i <= peopleCount; i++) {
                      urls.push(document.getElementById(String(i)).value);
                    }
                    if (urls.length == 0) {
                      alert("URL을 입력해주세요 :)");
                    } else {
                      axios
                        .post("http://bobgo.cafe24.com/checkURL", {
                          urls: urls,
                        })
                        .then(async (response) => {
                          var error_list = response.data.result;
                          var len_valid = await len_validation(urls);
                          var format_valid = await format_validation(urls);
                          if (
                            (len_valid === -1) &
                            (format_valid === -1) &
                            (error_list.length === 0)
                          ) {
                            axios
                              .post("http://bobgo.cafe24.com/storeURL", {
                                urls: urls,
                              })
                              .then((response) => {
                                if (response.data.result !== "") {
                                  // console.log(response.data.result);
                                  var code = response.data.result;
                                  navigator("/result/" + code);
                                  console.log(code);
                                } else {
                                  alert("Fail!");
                                }
                              });
                          } else if (len_valid !== -1) {
                            document.getElementById(
                              len_valid
                            ).style.backgroundColor = "#ffd6d6";
                            document.getElementById(len_valid).style.color =
                              "black";
                            alert("비었음!! URL을 입력해주세요");
                          } else if (format_valid !== -1) {
                            alert("에브리타임 URL을 확인해주세요");
                          } else if (error_list.length !== 0) {
                            for (var index of error_list) {
                              document.getElementById(
                                index + 1
                              ).style.backgroundColor = "#ffd6d6";
                              document.getElementById(index + 1).style.color =
                                "black";
                            }
                            alert("에브리타임 URL을 확인해주세요");
                          }
                        });
                    }
                  }}
                ></input>
                <input
                  type="submit"
                  value="submit"
                  class="u-form-control-hidden"
                />
                <input
                  style={{ display: "inline", alignItems: "center" }}
                  type="button"
                  className="button1234"
                  value="인원추가"
                  onClick={() => {
                    var curr_peopleCount = peopleCount;
                    curr_peopleCount++;
                    setPeopleCount(curr_peopleCount);
                    var curr_url = takeUrl;
                    curr_url.push(
                      <>
                        <input
                          input
                          type="text"
                          placeholder="에브리타임 시간표 공유 링크를 입력해주세요"
                          name={String(curr_peopleCount)}
                          id={String(curr_peopleCount)}
                          class="u-input u-input-rectangle u-radius-12 u-input-1"
                          required=""
                        ></input>
                        <br />
                      </>
                    );
                    setTakeUrl(curr_url);
                  }}
                ></input>
                <input
                  style={{ display: "inline", alignItems: "center" }}
                  type="button"
                  className="button1234"
                  value="인원삭제"
                  onClick={() => {
                    var curr_peopleCount = peopleCount;
                    curr_peopleCount--;
                    setPeopleCount(curr_peopleCount);
                    var curr_url = takeUrl;
                    curr_url.pop();
                  }}
                ></input>
              </div>

              {/* <h1>{peopleCount}</h1> */}
            </div>
          </div>
        </div>
        <Popup trigger={popup} setTrigger={setPopup}></Popup>
      </div>
      <footer
        class="u-align-center u-clearfix u-footer u-grey-80 u-footer"
        id="sec-28c0"
      >
        <div class="u-clearfix u-sheet u-sheet-1">
          <p class="u-small-text u-text u-text-variant u-text-1">
            BobGo Service.
          </p>
          <p class="u-small-text u-text u-text-variant u-text-1">
            Created with YeBeen, MinSoo
          </p>
        </div>
      </footer>
      {/* <section class="u-backlink u-clearfix u-grey-80">
            <a class="u-link" href="https://nicepage.com/website-templates" target="_blank">
                <span>Website Templates</span>
            </a>
            <a class="u-link" href="" target="_blank">
                <span>Website Builder Software</span>
            </a>.
        </section> */}
    </>
  );
}
export default Home;
