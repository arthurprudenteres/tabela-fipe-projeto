import React, { useEffect, useState } from "react";

function Card() {
  const vehicleType = [
    { id: 0, value: "cars", name: "Carro" },
    { id: 1, value: "motorcycles", name: "Motocicleta" },
    { id: 2, value: "trucks", name: "Caminhão" },
  ];

  const [calculation, setCalculation] = useState();
  const [loading, setLoading] = useState(false);

  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [brandList, setBrandList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [yearList, setYearList] = useState([]);

  const [brandStatus, setBrandStatus] = useState(false);
  const [modelStatus, setModelStatus] = useState(false);
  const [yearStatus, setYearStatus] = useState(false);

  const baseURL = "https://parallelum.com.br/fipe/api/v2/";
  const brandsURL = `${baseURL}${selectedType}/brands`;
  const modelsURL = `${brandsURL}/${selectedBrand}/models`;
  const yearsURL = `${modelsURL}/${selectedModel}/years`;
  const calcURL = `${yearsURL}/${selectedYear}`;

  async function getBrands() {
    await fetch(brandsURL)
      .then((res) => res.json())
      .then((data) => setBrandList(data));
  }

  async function getModels() {
    await fetch(modelsURL)
      .then((res) => res.json())
      .then((data) => setModelList(data));
  }

  async function getYears() {
    await fetch(yearsURL)
      .then((res) => res.json())
      .then((data) => setYearList(data));
  }

  async function getCalculation() {
    setLoading(true);
    await fetch(calcURL)
      .then((res) => res.json())
      .then((data) => setCalculation(data))
      .catch((err) => console.log(err));

    setLoading(false);
  }

  useEffect(() => {
    if (selectedType) {
      getBrands();
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedBrand) {
      getModels();
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      getYears();
    }
  }, [selectedModel]);

  return (
    <div className="card-body w-full h-full p-5 rounded-3xl flex flex-col flex-grow justify-between">
      <div className="card-top text-center">
        <h1 className="text-6xl font-semibold">Tabela Fipe</h1>
        <h2 className="text-xl mt-4 font-medium">Carros, Motos e Caminhões</h2>
      </div>

      {calculation ? (
        <div className={"flex flex-col bg-white p-5 lg:w-[60%] w-full h-full mt-4 rounded-xl text-purple-700 self-center lg:gap-5 gap-2"}>
          <p className="text-xl font-semibold text-center">{calculation.model}</p>
          <p className="lg:text-xl text-base lg:mt-3">Código tabela FIPE: {calculation.codeFipe}</p>
          <h4 className="lg:text-4xl text-xl font-semibold">Preço médio:</h4><span className="lg:text-7xl text-5xl font-bold -mt-4">{calculation.price}</span>
          <p className="mt-2">Atualizado em: {calculation.referenceMonth}</p>
        </div>
      ) : (
        <div className="invisible"></div>
      )}

      <div className="card-bottom lg:mt-20 mt-10 flex flex-col justify-between gap-8">
        <h3 className="text-center lg:text-2xl text-xl font-medium">
          Saiba quanto vale seu veículo novo, seminovo ou usado na Tabela FIPE
        </h3>

        <div className="inputs flex flex-col lg:flex-row justify-center items-center w-full lg:gap-5 gap-2">
          <select
            required
            className="select lg:w-[210px] w-full"
            defaultValue=""
            onChange={(e) => {
              setSelectedType(e.target.value);
              setBrandStatus(true);
            }}
          >
            <option disabled value="">
              Selecione o tipo
            </option>
            {vehicleType.map((e) => {
              return (
                <option key={e.id} value={e.value}>
                  {e.name}
                </option>
              );
            })}
          </select>

          <select
            className="select lg:w-[210px] w-full"
            defaultValue=""
            disabled={!brandStatus}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setModelStatus(true);
            }}
          >
            <option value="">Selecione a marca</option>
            {brandList.map((e) => {
              return (
                <option key={e.code} value={e.code}>
                  {e.name}
                </option>
              );
            })}
          </select>

          <select
            className="select lg:w-[330px] w-full"
            defaultValue=""
            disabled={!modelStatus}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setYearStatus(true);
            }}
          >
            <option disabled value="">
              Selecione o modelo
            </option>
            {modelList.map((e) => {
              return (
                <option key={e.code} value={e.code}>
                  {e.name}
                </option>
              );
            })}
          </select>

          <select
            className="select lg:w-[180px] w-full"
            defaultValue=""
            disabled={!yearStatus}
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
          >
            <option disabled value="">
              Selecione o ano
            </option>
            {yearList.map((e) => {
              return (
                <option key={e.code} value={e.code}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className={
            !loading
              ? "btn lg:btn-wide btn-block self-center text-white bg-green-600 border-transparent"
              : "btn lg:btn-wide self-center text-white bg-green-900 border-transparent loading"
          }
          disabled={!selectedBrand || !selectedModel || !selectedYear}
          onClick={getCalculation}
        >
          Buscar Veículo
        </button>
      </div>
    </div>
  );
}

export default Card;
