import React from 'react';
import Card from '@/components/atoms/Card';

interface MetricCardProps {
    icon: string;
    label: string;
    value: string | number;
    subtext?: string;
    color?: string;
}

export default function MetricCard({ icon, label, value, subtext, color = 'text-primary-light' }: MetricCardProps) {
    return (
        <Card className="text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <div className={`text-3xl font-bold ${color} mb-1`}>{value}</div>
            <div className="text-sm font-medium text-slate-300">{label}</div>
            {subtext && <div className="text-xs text-muted mt-1">{subtext}</div>}
        </Card>
    );
}
