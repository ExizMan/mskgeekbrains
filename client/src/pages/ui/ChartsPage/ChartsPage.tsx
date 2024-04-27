import cls from './ChartsPage.module.scss';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Text } from '@shared/ui';
import { SizeEnum } from '@shared/lib';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend, Rectangle,
} from 'recharts';

export const ChartsPage = () => {
    const satisfactionData = [
        { rate: 1, value: 1 },
        { rate: 2, value: 2 },
        { rate: 3, value: 5 },
        { rate: 4, value: 20 },
        { rate: 5, value: 40 },
    ];

    const responseTimeData = [
        { iter: '1', time: 4.2 },
        { iter: '2', time: 2.5 },
        { iter: '3', time: 2.12 },
        { iter: '4', time: 1.20 },
        { iter: '5', time: 0.25 },
    ];

    const responseAccuracyData = [
        { name: 'Правильно', value: 87 },
        { name: 'Неправильно', value: 13 },
    ];

    return (
        <div className={cls.wrapper}>
            <Swiper slidesPerView={1} className={cls.list}>
                <SwiperSlide className={cls.listItem}>
                    <Text.Heading size={SizeEnum.H2}>Удовлетворённость</Text.Heading>
                    <BarChart className={cls.char} width={1200} height={700} data={satisfactionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rate" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </SwiperSlide>
                <SwiperSlide className={cls.listItem}>
                    <Text.Heading size={SizeEnum.H2}>Время ответа (в секундах)</Text.Heading>
                    <LineChart className={cls.char} width={1200} height={700} data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="iter" />
                        <YAxis dataKey="time" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </SwiperSlide>
                <SwiperSlide className={cls.listItem}>
                    <Text.Heading size={SizeEnum.H2}>Точность ответа</Text.Heading>
                    <PieChart className={cls.char} width={200} height={200}>
                        <Pie data={responseAccuracyData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                             outerRadius={80} fill="#8884d8">
                            {responseAccuracyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#00C49F', 'red'][index % 2]} />
                            ))}
                        </Pie>
                        <Tooltip />

                    </PieChart>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

