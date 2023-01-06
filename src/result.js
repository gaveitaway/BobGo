import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./resultcss/result.css";
import TablePopup from "./components/tablePopup";
import axios from "axios";

// result.css 1712
function exportHTML(emptyArr, setPopup, setPopupName) {
  var list = [];
  var len = 0;
  var h = "30px";
  var t = "";
  var class_name;
  var dif = -1;
  var first = true;
  var html;

  for (var i = 0; i < emptyArr.length; i++) {
    t = (i * 30).toString() + "px";
    if (i != 0) dif = emptyArr[i - 1].length;
    len = emptyArr[i].length;
    if (dif != len) first = true;
    else first = false;
    class_name = "subject color" + (len + 1).toString();

    let names = "";

    if (len != 0) {
      for (let name of emptyArr[i]) {
        names = names + name + ",";
      }
      names = names.substring(0, names.length - 1);
    } else {
      names = "모두 불가능한 시간!";
    }

    if (first == true)
      html = (
        <>
          <br></br>
          <p>
            <em>{len.toString()}명가능</em>
          </p>
        </>
      );
    else html = <></>;

    list.push(
      <div
        class={class_name}
        style={{ height: h, top: t }}
        onClick={() => {
          setPopup(true);
          setPopupName(names);
        }}
      >
        {html}
      </div>
    );
  }

  return list;
}

const Result = (props) => {
  const [emptyTimes, setEmpty] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
  });
  const [popup, setPopup] = useState(false);
  const [popupname, setPopupName] = useState("");
  const params = useParams();
  const code = params.code;

  const shareKakao = () => {
    alert("Test:)");
    window.Kakao.init("6ec8ed312554797c30beb43e52929d74");
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "약속시간 서비스",
        description: "약속 잡을 수 있는 시간을 확인해보세요!",
        imageUrl: "https://ifh.cc/g/Kj3Vnn.jpg",
        link: {
          webUrl: "http://bobgo.cafe24.com/result/" + code,

          mobileWebUrl: "http://bobgo.cafe24.com/result/" + code,
          androidExecParams: "test",
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            webUrl: "http://bobgo.cafe24.com/result/" + code,
            mobileWebUrl: "http://bobgo.cafe24.com/result/" + code,
          },
        },
      ],
    });
  };

  useEffect(() => {
    axios.get('http://bobgo.cafe24.com/user_count' ).then(
                        function(response){
                            
                            alert(response.data);
                        }
                    ).catch(function(err){
                        alert("실패");
                        console.log('실패');
                    });
  
    axios
      .post("http://bobgo.cafe24.com/processing_timetable", { code: code })
      .then((response) => {
        if (response.data.result !== {}) {
          console.log(response.data.result);
          setEmpty(response.data.result);
        } else {
          alert("Fail!");
        }
      });
  }, []);

  return (
    <>
      <div class="App">
        <div className="=">
          <img
            width="30"
            className=""
            src="https://ifh.cc/g/BbQVhq.png"
            onClick={shareKakao}
          />
        </div>
        <h1>
          <em>시간을 클릭해보세요!</em>
        </h1>

        <div id="container" class="timetable" style={{ height: "601px" }}>
          <div class="wrap">
            <div class="tablehead">
              <table class="tablehead">
                <tbody>
                  <tr>
                    <th></th>
                    <td>월</td>
                    <td>화</td>
                    <td>수</td>
                    <td>목</td>
                    <td>금</td>
                    <td style={{ display: "none" }}>토</td>
                    <td style={{ display: "none" }}>일</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="tablebody">
              <table class="tablebody" style={{ margintop: "-2px" }}>
                <tbody>
                  <tr>
                    <th>
                      <div class="times">
                        <div class="time">오전 0시</div>
                        <div class="time">오전 1시</div>
                        <div class="time">오전 2시</div>
                        <div class="time">오전 3시</div>
                        <div class="time">오전 4시</div>
                        <div class="time">오전 5시</div>
                        <div class="time">오전 6시</div>
                        <div class="time">오전 7시</div>
                        <div class="time">오전 8시</div>
                        <div class="time">오전 9시</div>
                        <div class="time">오전 10시</div>
                        <div class="time">오전 11시</div>
                        <div class="time">오후 12시</div>
                        <div class="time">오후 1시</div>
                        <div class="time">오후 2시</div>
                        <div class="time">오후 3시</div>
                        <div class="time">오후 4시</div>
                        <div class="time">오후 5시</div>
                        <div class="time">오후 6시</div>
                        <div class="time">오후 7시</div>
                        <div class="time">오후 8시</div>
                        <div class="time">오후 9시</div>
                        <div class="time">오후 10시</div>
                        <div class="time">오후 11시</div>
                      </div>
                    </th>
                    <td>
                      <div class="cols" style={{ width: "150px" }}>
                        {exportHTML(emptyTimes["Mon"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td>
                      <div class="cols" style={{ width: "150px" }}>
                        {exportHTML(emptyTimes["Tue"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td>
                      <div class="cols" style={{ width: "150px" }}>
                        {exportHTML(emptyTimes["Wed"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td>
                      <div class="cols" style={{ width: "150px" }}>
                        {exportHTML(emptyTimes["Thu"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td>
                      <div class="cols" style={{ width: "150px" }}>
                        {exportHTML(emptyTimes["Fri"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td style={{ display: "none" }}>
                      <div class="150px"></div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td style={{ display: "none" }}>
                      <div class="cols"></div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="nontimes"></div>
            </div>
          </div>
        </div>
        <TablePopup
          trigger={popup}
          setTrigger={setPopup}
          name={popupname}
        ></TablePopup>
      </div>
    </>
  );
};

export default Result;
