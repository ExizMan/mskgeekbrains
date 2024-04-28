import cls from './ChartsPage.module.scss';
import { Text } from '@shared/ui';
import { SizeEnum } from '@shared/lib';
import { Line, Pie, Tiny } from '@ant-design/plots';

export const ChartsPage = () => {
    const pieConfig = {
        data: [
            { type: '1', value: 1 },
            { type: '2', value: 2 },
            { type: '3', value: 18 },
            { type: '4', value: 15 },
            { type: '5', value: 50 },
        ],
        angleField: 'value',
        colorField: 'type',
    };

    const lineConfig = {
        data: [
            { iter: '1', value: 4.2 },
            { iter: '5', value: 4.1 },
            { iter: '10', value: 3.5 },
            { iter: '50', value: 3.5 },
            { iter: '100', value: 2.9 },
            { iter: '500', value: 2.6 },
            { iter: '1000', value: 1.7 },
            { iter: '2000', value: 1.9 },
            { iter: '3000', value: 1.2 },
        ],
        xField: 'iter',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    const percent = 0.9;
    const ringConfig = {
        percent,
        color: ['#E8EFF5', '#66AFF4'],
        annotations: [
            {
                type: 'text',
                style: {
                    text: `${percent * 100}%`,
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 16,
                    fontStyle: 'bold',
                },
            },
        ],
    };
    return (
        <div className={cls.wrapper}>
            <div className={cls.item}>
                <Text.Heading size={SizeEnum.H2}>Удовлетворённость</Text.Heading>
                <Pie {...pieConfig} />
            </div>
            <div className={cls.item}>
                <Text.Heading size={SizeEnum.H2}>Время ответа (в секундах)</Text.Heading>
                <Line {...lineConfig} />
            </div>
            <div className={cls.item}>
                <Text.Heading size={SizeEnum.H2}>Точность ответа</Text.Heading>
                <Tiny.Ring {...ringConfig} />
            </div>


        </div>
    );
};

