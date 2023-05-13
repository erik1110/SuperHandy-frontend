import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "@/assets/css/swal.css";

export const useAlert = () => {
  //基本視窗(要按OK才會關閉)
  const basicBox = function (text, nuxtFunc) {
    swal.fire({ title: "", text, confirmButtonText: "確定" }).then((result) => {
      if (nuxtFunc && typeof nuxtFunc === "function") {
        nuxtFunc();
      }
    });
    document
      .querySelector(".swal2-container.swal2-center.swal2-backdrop-show")
      .classList.add("sp-basicBox");
    document.querySelector(
      ".swal2-styled.swal2-confirm"
    ).style.backgroundColor = "#fff";
  };

  //確認視窗
  const confirmBox = function (text, agreeFunc) {
    swal
      .fire({
        title: "",
        text,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      })
      .then((result) => {
        // console.log(result, "result");
        if (result.isConfirmed) {
          if (typeof agreeFunc === "function") {
            agreeFunc();
          }
        }
      });
    document
      .querySelector(".swal2-container.swal2-center.swal2-backdrop-show")
      .classList.add("sp-confirmBox");
    document.querySelector(".swal2-styled.swal2-cancel").style.backgroundColor =
      "#fff";
    document.querySelector(
      ".swal2-styled.swal2-confirm"
    ).style.backgroundColor = "#fff";
  };

  //刪除確認視窗
  const deleteConfirmBox = function (text, agreeFunc) {
    swal
      .fire({
        title: "刪除確認",
        text,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      })
      .then((result) => {
        // console.log(result, "result");
        if (result.isConfirmed) {
          if (typeof agreeFunc === "function") {
            agreeFunc();
          }
        }
      });
    document
      .querySelector(".swal2-container.swal2-center.swal2-backdrop-show")
      .classList.add("sp-deleteConfirmBox");
    document.querySelector(".swal2-styled.swal2-cancel").style.backgroundColor =
      "#fff";
    document.querySelector(
      ".swal2-styled.swal2-confirm"
    ).style.backgroundColor = "#fff";
    document.querySelector(".swal2-title").style.color = "#fff";
  };

  return {
    basicBox,
    confirmBox,
    deleteConfirmBox,
  };
};
