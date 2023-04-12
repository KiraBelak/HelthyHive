import React from "react";

const Table = () => {
    return (
        <div className="flex flex-col mt-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-2 font-medium text-gray-500 uppercase tracking-wider text-left text-center"
                                    >
                                        Nivel
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-2 font-medium text-gray-500 uppercase tracking-wider text-left text-center"
                                    >
                                        Estrellas
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-50">
                                    <td className="px-4 py-2 font-medium text-gray-900 text-center align-middle">Oro</td>
                                    <td className="px-4 py-2 text-gray-900 text-center align-middle">100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
