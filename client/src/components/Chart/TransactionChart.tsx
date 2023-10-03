import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TransactionData {
    name: string;
    Donation: number;
    Receive: number;
}

const data: TransactionData[] = [
    {
        name: 'Jan',
        Donation: 4000,
        Receive: 2400
    },
    {
        name: 'Feb',
        Donation: 3000,
        Receive: 1398
    },
    {
        name: 'Mar',
        Donation: 2000,
        Receive: 5000
    },
    {
        name: 'Apr',
        Donation: 2780,
        Receive: 3908
    },
    {
        name: 'May',
        Donation: 1890,
        Receive: 4800
    },
    {
        name: 'Jun',
        Donation: 2390,
        Receive: 3800
    },
    {
        name: 'July',
        Donation: 3490,
        Receive: 4300
    },
    {
        name: 'Aug',
        Donation: 2000,
        Receive: 980
    },
    {
        name: 'Sep',
        Donation: 2780,
        Receive: 3908
    },
    {
        name: 'Oct',
        Donation: 1890,
        Receive: 4800
    },
    {
        name: 'Nov',
        Donation: 2390,
        Receive: 3800
    },
    {
        name: 'Dec',
        Donation: 3490,
        Receive: 4300
    }
]

const TransactionChart: React.FC = () => {
    return (
        <div className="h-[22rem] bg-white p-4 rounded-md border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Transactions</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Donation" fill="#0ea5e9" />
                        <Bar dataKey="Receive" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default TransactionChart