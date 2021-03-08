import axios from "axios";

export const getProposalDHI = (x_track_id, uuidHdi) => {
  let getFileName = function () {
    let fileName = "propostaHDIFinal.pdf";
    return fileName;
  };

  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  axios
    .get(
      "https://cors-anywhere.herokuapp.com/http://token-server-dot-bidu-digital-dev.appspot.com/hdi-token"
    )
    .then(function (data) {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://openapi-int.hdi.com.br/marketplace/offer/v1/offers/${uuidHdi}/items/1/insurance/proposals/document`,
        {
          method: "GET",
          headers: {
            "X-Company-Id": "001800001",
            "X-Application-Id": "0018",
            "X-User-Id": "00459359000121",
            "X-Track-Id": x_track_id,
            Authorization: data.data.token,
          },
        }
      )
        .then(async (res) => ({
          filename: getFileName(),
          blob: await res.blob(),
        }))
        .then((resObj) => {
          const newBlob = new Blob([resObj.blob], {
            type: "application/pdf",
          });
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
          } else {
            const objUrl = window.URL.createObjectURL(newBlob);
            let link = document.createElement("a");
            link.href = objUrl;
            link.download = resObj.filename;
            link.click();

            setTimeout(() => {
              window.URL.revokeObjectURL(objUrl);
            }, 250);
          }
        })
        .catch((error) => {
          console.log("Erro no download");
        });
    });
};
