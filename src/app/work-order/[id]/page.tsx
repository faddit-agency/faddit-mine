import { WorkOrderDetail } from "@/components/work-order-detail";

interface WorkOrderPageProps {
  params: {
    id: string;
  };
}

export default function WorkOrderPage({ params }: WorkOrderPageProps) {
  return <WorkOrderDetail id={params.id} />;
} 