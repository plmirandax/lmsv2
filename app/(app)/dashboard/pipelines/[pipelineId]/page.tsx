import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { getLanesWithTicketAndTags, getPipelineDetails, updateLanesOrder, updateTicketsOrder } from "@/lib/queries";
import { LaneDetail } from "@/lib/types";
import { redirect } from "next/navigation";
import React from "react";
import PipelineInfoBar from "./_components/pipeline-infobar";
import PipelineView from "./_components/pipeline-view";
import PipelineSettings from "./_components/pipeline-settings";

type Props = {
params: {sysUserId: string; pipelineId: string;}
}

const PipelinePage = async ({ params }: Props) => {
    const pipelineDetails = await getPipelineDetails(params.pipelineId)

    if (!pipelineDetails)
    return redirect(`/dashboard/${params.sysUserId}/pipelines`)

    const pipeline = await prisma.pipeline.findMany({
        where: {sysUserId: params.sysUserId},
    })

    const lanes = (await getLanesWithTicketAndTags(
        params.pipelineId)) as LaneDetail[]

    return ( 
        <Tabs
      defaultValue="view"
      className="w-full"
    >
      <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
        <PipelineInfoBar
          pipelineId={params.pipelineId}
          sysUserId={params.sysUserId}
          pipelines={pipeline}
        />
        <div>
          <TabsTrigger value="view">Pipeline View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="view">
        <PipelineView
          lanes={lanes}
          pipelineDetails={pipelineDetails}
          pipelineId={params.pipelineId}
          sysUserId={params.sysUserId}
          updateLanesOrder={updateLanesOrder}
          updateTicketsOrder={updateTicketsOrder}
        />
      </TabsContent>
      <TabsContent value="settings">
        <PipelineSettings
          pipelineId={params.pipelineId}
          pipelines={pipeline}
          sysUserId={params.sysUserId}
        />
      </TabsContent>
      <div>test</div>
    </Tabs>
    )
}
export default PipelinePage