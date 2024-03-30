import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    params: {sysUserId: string}
}

const Pipelines = async ({ params }: Props) => {
    const pipelineExists = await prisma.pipeline.findFirst({
        where: { sysUserId: params.sysUserId},
    })

    if (pipelineExists)
    return redirect(`
    /dashboard/${params.sysUserId}/pipelines/${pipelineExists.id}
    `)

    try {
       const response = await prisma.pipeline.create({
        data: { name: "New Pipeline", sysUserId: params.sysUserId},
       }) 
       return redirect
    (`/dashboard/${params.sysUserId}/pipelines/${response.id}`)
    } catch (error) {
        console.log()    
    }
    <div>Heyy</div>
}


export default Pipelines