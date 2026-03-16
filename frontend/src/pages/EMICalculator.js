import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const time = parseFloat(tenure);

    if (principal && rate && time) {
      const emiValue =
        (principal * rate * Math.pow(1 + rate, time)) /
        (Math.pow(1 + rate, time) - 1);
      const totalPaymentValue = emiValue * time;
      const totalInterestValue = totalPaymentValue - principal;

      setEmi(Math.round(emiValue));
      setTotalInterest(Math.round(totalInterestValue));
      setTotalPayment(Math.round(totalPaymentValue));
    }
  };

  const chartData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ['#0ea5e9', '#6366f1'],
        borderColor: ['#0284c7', '#4f46e5'],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#faf8ff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            EMI <span className="gradient-text">Calculator</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Calculate your monthly loan payments instantly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-heading font-semibold mb-6 text-gray-900 dark:text-white">
              Loan Details
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-700 dark:text-gray-300 font-medium">
                    Loan Amount
                  </label>
                  <span className="text-sky-500 font-semibold">
                    ₹{loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹1L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-700 dark:text-gray-300 font-medium">
                    Interest Rate (% p.a.)
                  </label>
                  <span className="text-sky-500 font-semibold">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-700 dark:text-gray-300 font-medium">
                    Loan Tenure (Months)
                  </label>
                  <span className="text-sky-500 font-semibold">
                    {tenure} months ({Math.floor(tenure / 12)} years)
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="360"
                  step="12"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card bg-gradient-to-br from-sky-500 to-blue-600 text-white">
              <h3 className="text-lg mb-2 opacity-90">Monthly EMI</h3>
              <p className="text-4xl font-heading font-bold">
                ₹{emi.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Principal Amount
                  </span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    ₹{parseInt(loanAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Interest
                  </span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    ₹{totalInterest.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Payment
                  </span>
                  <span className="text-xl font-semibold text-sky-500">
                    ₹{totalPayment.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">
                Payment Breakdown
              </h3>
              <div className="max-w-xs mx-auto">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
