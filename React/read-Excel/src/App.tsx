import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./styles.css";

import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState();

  let lineQuantity = 0;
  let titleFile = "";
  let hasEspecialCaracteres = false;

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls", ".xlsx"],
    },
    maxFiles: 1,
  });

  const readExcel = (file: any) => {
    const reader = new FileReader();

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file[0]);
    fileReader.onload = (event) => {
      let data = event.target?.result;
      let workbook = XLSX.read(data, { type: "binary" });
      console.log(workbook);
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(rowObject[0]);
        console.log(rowObject.length + 1);
      });
    };
  };

  if (acceptedFiles.length > 1) {
    readExcel(acceptedFiles);
  }

  return (
    <div className="container">
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files;
            readExcel(file);
          }}
        />
        {/* <div {...getRootProps()}>
          <input onChange={(e) => {
            const file = e.target.files;
            readExcel(file);
          }} {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div> */}
      </div>
      <div>
        <h3>Nome do arquivo: {titleFile}</h3>
        <h3>Numero de linhas: {lineQuantity}</h3>
        <h3>Possui caractere especial: {hasEspecialCaracteres} </h3>

        <table className="table">
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
