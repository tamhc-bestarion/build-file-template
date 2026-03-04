import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileTypeName = searchParams.get('fileTypeName')

  if (fileTypeName) {
    const fileType = await prisma.fileType.findUnique({ where: { name: fileTypeName } })
    if (!fileType) {
      return NextResponse.json({ data: null })
    }
    const lastBuild = await prisma.fileBuild.findFirst({
      where: { fileTypeId: fileType.id },
      orderBy: { id: 'desc' },
      include: { fileType: true },
    })
    return NextResponse.json({ data: lastBuild })
  }

  const fileBuilds = await prisma.fileBuild.findMany({
    include: { fileType: true },
  })
  return NextResponse.json({ data: fileBuilds })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fileTypeName, content, numbers_created = 1 } = body as {
      fileTypeName?: string
      content: string
      numbers_created?: number
    }

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'content is required and must be a string' },
        { status: 400 }
      )
    }

    const name = fileTypeName || 'Contract'
    let fileType = await prisma.fileType.findUnique({ where: { name } })
    if (!fileType) {
      fileType = await prisma.fileType.create({
        data: { name, status: true },
      })
    }

    const lastBuild = await prisma.fileBuild.findFirst({
      where: { fileTypeId: fileType.id },
      orderBy: { id: 'desc' },
    })

    const fileBuild = lastBuild
      ? await prisma.fileBuild.update({
          where: { id: lastBuild.id },
          data: {
            content,
            numbers_created: Number(numbers_created) || 1,
          },
          include: { fileType: true },
        })
      : await prisma.fileBuild.create({
          data: {
            content,
            numbers_created: Number(numbers_created) || 1,
            fileTypeId: fileType.id,
          },
          include: { fileType: true },
        })

    return NextResponse.json({ data: fileBuild })
  } catch (e) {
    console.error('POST /api/build_file error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to save file' },
      { status: 500 }
    )
  }
}