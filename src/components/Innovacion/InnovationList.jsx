// src/components/innovation/InnovationList.js

import React from 'react';
import { Link } from 'react-router-dom';

const InnovationList = ({ innovationItems }) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {innovationItems.length > 0 ? (
        innovationItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-4 bg-[#23355B]">
            <Link to={`/innovation/${item.pk}`} className="block text-center">
              {item.fields && item.fields.inn_txt_image && (
                <div className="w-44 h-44 min-w-[160px] min-h-[160px] rounded-full overflow-hidden mb-2 bg-white">
                  <img
                    src={`data:image/jpeg;base64,${item.fields.inn_txt_image}`}
                    alt={item.fields.inn_txt_tittle}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="text-white text-sm font-bold">{item.fields?.inn_txt_tittle || "Innovación agregada"}</div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center">No hay innovaciones disponibles.</div>
      )}
    </div>
  );
};

export default InnovationList;
