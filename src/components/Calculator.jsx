import React, { useEffect, useState } from "react";

const Calculator = () => {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");

    const [mortgage, setMortgage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const calculateEMI = (principal, rate, years) => {
        const monthlyRate = rate / (12 * 100);
        const totalMonths = years * 12;

        const emi =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);

        return emi;
    };

    const handleCalculate = () => {
        if (principal === "" || rate === "" || years === "") {
            setMortgage(null);
            setErrorMessage("Please fill in all fields.");
            return;
        }

        setErrorMessage("");

        const emi = calculateEMI(
            Number(principal),
            Number(rate),
            Number(years)
        );
        setMortgage(emi.toFixed(2));
    };

    const handleInput = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        if (id === "principal") {
            setPrincipal(value);
        } else if (id === "rate") {
            setRate(value);
        } else if (id === "years") {
            setYears(value);
        }
    };

    useEffect(() => {
        handleCalculate();
    }, [principal, rate, years]);

    return (
        <div className="flex flex-col justify-center items-center pb-12">
            <div className="pt-20">
                <h1 className="text-white text-5xl font-bold">
                    Mortgage Calculator
                </h1>
            </div>

            <div className="pt-10 flex flex-col items-center justify-center gap-5">
                <div className="">
                    <span className="text-white font-bold text-lg block py-1">
                        Principal Loan Amount
                    </span>
                    <input
                        type="text"
                        placeholder="Enter the Principal Amount"
                        className="border outline-none px-6 py-3 w-96 rounded"
                        id="principal"
                        value={principal}
                        onChange={handleInput}
                    />
                </div>
                <div className="">
                    <span className="text-white font-bold text-lg block py-1">
                        Interest Rate
                    </span>
                    <input
                        type="text"
                        placeholder="Enter Interest Rate (annual)"
                        className="border outline-none px-6 py-3 w-96 rounded"
                        id="rate"
                        value={rate}
                        onChange={handleInput}
                    />
                </div>
                <div className="">
                    <span className="text-white font-bold text-lg block py-1">
                        Length of Loan
                    </span>
                    <input
                        type="text"
                        placeholder="Enter Number of Years on Your Mortgage"
                        className="border outline-none px-6 py-3 w-96 rounded"
                        id="years"
                        value={years}
                        onChange={handleInput}
                    />
                </div>

                <div className="">
                    <button
                        className="bg-[#F25022] px-6 py-3 rounded font-bold text-white text-lg"
                        onClick={handleCalculate}
                    >
                        Calculate
                    </button>
                </div>

                <div className="">
                    {mortgage !== null && (
                        <div className="mt-5">
                            <p className="text-white font-semibold text-lg">
                                Your Monthly Mortgage Payment will be $
                                {mortgage}
                            </p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mt-5">
                            <p className="text-red-500 font-semibold text-lg">
                                {errorMessage}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
