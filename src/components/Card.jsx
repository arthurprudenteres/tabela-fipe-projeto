import React, { useEffect, useRef, useState } from "react";
const API_URL = "https://parallelum.com.br/fipe/api/v2/";

function Card() {
  const [types, setTypes] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState("");
  const [years, setYear] = useState("");

  const handleTypes = (e) => {
    setTypes(e.target.value);
  };

  const handleModels = (e) => {
    setModels(e.target.value);
  }

  useEffect(() => {
    if (types) {
      fetch(API_URL + `${types}/brands`)
        .then((res) => res.json())
        .then((data) => {
          const brands = data.map((brand) => ({
            label: brand.name,
            value: brand.code,
          }));
          setBrands(brands);
        });
    }
  }, [types]);

  useEffect(() => {
    if (brands) {
      fetch(API_URL + `${types}/brands/${brands.label}/models`)
        .then((res) => res.json())
        .then((data) => {
          setModels(data);
        });
    }
  }, [brands]);

  return (
    <div className="card-body bg-black/50 w-[1000px] h-[600px] p-10 rounded-3xl flex flex-col justify-between">
      <div className="card-top text-center">
        <h1 className="text-6xl font-semibold">Tabela Fipe</h1>
        <h2 className="text-xl mt-4 font-medium">Carros, Motos e Caminhões</h2>
        <p className="mt-2">Atualizado em: </p>
      </div>

      <div className="card-bottom mt-20 flex flex-col justify-between gap-8">
        <h3 className="text-center text-2xl font-medium">
          Saiba quanto vale seu veículo novo, seminovo ou usado na Tabela FIPE
        </h3>

        <div className="inputs flex justify-center items-center gap-5 w-full">
          <div id="vehicle-type">
            <select
              className="select w-[210px]"
              value={types}
              onChange={handleTypes}
            >
              <option value="" disabled>
                Selecione o tipo
              </option>
              <option value="cars" key="cars">
                Carro
              </option>
              <option value="motorcycles" key="motorcycles">
                Moto
              </option>
              <option value="trucks" key="trucks">
                Caminhão
              </option>
            </select>
          </div>

          <div id="vehicle-brand">
          {types.length > 1 ? (
            <select className="select w-[210px]" defaultValue="">
              <option disabled value="">
                Selecione a marca
              </option>
              {brands.map((brand) => (
                <option key={brand.value} value={brand.value}>
                  {brand.label}
                </option>
              ))}
            </select>
          ) : (
            <select className="select w-[210px]" defaultValue="" disabled>
              <option disabled value="">
                Selecione a marca
              </option>
            </select>
          )}
          </div>

          <div id="vehicle-model">
            {brands.length > 1 ? (
              <select className="select w-[330px]" defaultValue="">
                <option disabled value="">
                  Selecione o modelo
                </option>
              </select>
            ) : (
              <select className="select w-[330px]" defaultValue="" disabled>
                <option disabled value="">
                  Selecione o modelo
                </option>
              </select>
            )}
          </div>

          <div id="vehicle-year">
            {models.length > 1 ? (
              <select className="select w-[180px]" defaultValue="">
              <option disabled selected>
                Selecione o ano
              </option>
            </select>
            ) : (
              <select className="select w-[180px]" defaultValue="" disabled>
              <option disabled selected>
                Selecione o ano
              </option>
            </select>
            )
            }
            
          </div>
        </div>

        <button className="btn btn-wide self-center">Buscar Veículo</button>
      </div>
    </div>
  );
}

export default Card;
