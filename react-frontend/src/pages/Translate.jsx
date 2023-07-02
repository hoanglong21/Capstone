import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
import { FaExchangeAlt } from "react-icons/fa";

function Translate() {
  const [origText, setOrigText] = useState("");
  const [transText, setTransText] = useState("");
  const [sourceLang, setSourceLang] = useState("id");
  const [targetLang, setTargetLang] = useState("en");
  const [error, setError] = useState("");

  async function switchLanguage() {
    const oldTargetLang = targetLang;
    const oldTransText = transText;
    setTargetLang(sourceLang);
    setSourceLang(oldTargetLang);
    setTransText(origText);
    setOrigText(oldTransText);
  }

  return (
    <div className="d-block w-100 vh-100 p-3">
      <div className="h-50 d-flex flex-column justify-content-center align-items-center">
        {/*  */}
        <h4 className="text-3xl font-bold text-center text-black my-3">Translate</h4>
        {/*  */}
        <Card className="h-100 w-100">
          {/*  */}
          <CardHeader>
            <div className="d-flex flex-row">
              <Input
                id="sourceLang"
                name="sourceLang"
                type="select"
                value={sourceLang}
              >
                {/* <option value={code}>{language}</option> */}
              </Input>
              <Button
                className="secondary mx-3"
                outline
                onClick={switchLanguage}
              >
                <FaExchangeAlt />
              </Button>
              <Input
                id="targetLang"
                name="targetLang"
                type="select"
                value={targetLang}
              >
                {/* <option value={code}>{language}</option> */}
              </Input>
            </div>
          </CardHeader>
          {/*  */}
          <CardBody className="p-0">
            <div className="d-flex flex-row h-100">
              <Input
                name="text"
                type="textarea"
                className="rounded-0"
                maxLength={5000}
                value={origText}
              />
              <Input
                value={transText}
                type="textarea"
                className="rounded-0"
                disabled={true}
              />
            </div>
          </CardBody>
          <CardFooter>
            <div className="d-flex flex-row justify-content-between">
              <div className="text-danger">{error}</div>
              <div>{origText.length} / 5000</div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Translate;
