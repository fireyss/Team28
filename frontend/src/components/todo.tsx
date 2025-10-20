import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconCircleFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLoader,
  IconPlus,
} from "@tabler/icons-react"
import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState
} from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
// import { description } from "./chart-area-interactive"

export const schema = z.object({
  id: z.number(),
  title: z.string(),
  assignee: z.string(),
  status: z.string(),
  label: z.string(),
  urgency: z.string(),
  deadline: z.string(),
  description: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}



const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      let icon;
      if (row.original.status === "Done")
        icon = <IconCircleCheckFilled className={"fill-green-500 dark:fill-green-400"} />
      if (row.original.status === "In Process")
        icon = <IconLoader />
      if (row.original.status === "In Review")
        icon = <IconCircleFilled className={"fill-yellow-500"} />

      let colour = "green";
      if (row.original.urgency === "High")
        colour = "red";
      if (row.original.urgency === "Medium")
        colour = "orange";
      if (row.original.urgency === "Low")
        colour = "green";

      return (
        <Dialog>
          <DialogTrigger>
            <Button variant="link" className="text-foreground w-fit px-0 text-left">
              {row.original.title}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {row.original.title}
              </DialogTitle>
              <DialogDescription>
                {row.original.description}
              </DialogDescription>
              <DialogDescription>
                <div>Deadline : {row.original.deadline}</div>
              </DialogDescription>

              <div className="flex items-center py-4 gap-2">
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                  {row.original.assignee}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                  {icon}
                  {row.original.status}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                  <div>{row.original.label}</div>
                </Badge>
                <div style={{ color: colour, fontSize: 15 }}>{row.original.urgency}</div>

              </div>

            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.assignee}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let icon;

      if (row.original.status === "Done")
        icon = <IconCircleCheckFilled className={"fill-green-500 dark:fill-green-400"} />
      if (row.original.status === "In Process")
        icon = <IconLoader />
      if (row.original.status === "In Review")
        icon = <IconCircleFilled className={"fill-yellow-500"} />

      return <Badge variant="outline" className="text-muted-foreground px-1.5">
        {icon}
        {row.original.status}
      </Badge>
    },
    filterFn: "multipleIncludes",
  },
  {
    accessorKey: "label",
    header: () => "Label",
    cell: ({ row }) => {
      return <Badge variant="outline" className="text-muted-foreground px-1.5">
        <div>{row.original.label}</div>
      </Badge>
    },

  },
  {
    accessorKey: "urgency",
    header: () => <div>Urgency</div>,
    cell: ({ row }) => {
      let colour = "green";
      if (row.original.urgency === "High")
        colour = "red";
      if (row.original.urgency === "Medium")
        colour = "orange";
      if (row.original.urgency === "Low")
        colour = "green";
      return <div style={{ color: colour }}>{row.original.urgency}</div>
    },
    filterFn: "multipleIncludes",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      return row.original.deadline

    },
  },
  {
    id: "actions",
    cell: ({ row }) => (

      <DropdownMenu>
        <DropdownMenuTrigger asChild>

          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <Dialog>
            <DialogTrigger>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {row.original.title}
                </DialogTitle>
                <DialogDescription>
                  {row.original.description}
                </DialogDescription>
                <DialogDescription>
                  <div>Deadline : {row.original.deadline}</div>
                </DialogDescription>

                <div className="flex items-center py-4 gap-2">
                  <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {row.original.assignee}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {/* {icon} */}
                    {row.original.status}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground px-1.5">
                    <div>{row.original.label}</div>
                  </Badge>
                  {/* <div style={{ color: colour, fontSize: 15 }}>{row.original.urgency}</div> */}

                </div>

              </DialogHeader>
            </DialogContent>
          </Dialog>

          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger>
              <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to permanently
                  delete this task from our servers?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button type="submit" >Confirm</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>





    ),
  },
]

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [statusFilter, setStatusFilter] = React.useState<string[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    filterFns: {
      multipleIncludes: (row, columnId, filterValues: string[]) => {
        if (!filterValues?.length) return true
        const value = row.getValue<string>(columnId)
        return filterValues.includes(value)
      },
    },

  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <>
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Assignee</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("Todo")}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...statusFilter, "Todo"]
                  : statusFilter.filter((v) => v !== "Todo")

                setStatusFilter(next)
                table.getColumn("status")?.setFilterValue(next)
              }}
            >
              Todo
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("In Process")}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...statusFilter, "In Process"]
                  : statusFilter.filter((v) => v !== "In Process")

                setStatusFilter(next)
                table.getColumn("status")?.setFilterValue(next)
              }}
            >
              In Process
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("In Review")}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...statusFilter, "In Review"]
                  : statusFilter.filter((v) => v !== "In Review")

                setStatusFilter(next)
                table.getColumn("status")?.setFilterValue(next)
              }}
            >
              In Review

            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("Done")}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...statusFilter, "Done"]
                  : statusFilter.filter((v) => v !== "Done")

                setStatusFilter(next)
                table.getColumn("status")?.setFilterValue(next)
              }}
            >
              Done
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Label</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Urgency</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("High")}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...statusFilter, "High"]
                  : statusFilter.filter((v) => v !== "High")

                setStatusFilter(next)
                table.getColumn("urgency")?.setFilterValue(next)
              }}
            >
              High
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("Medium")}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...statusFilter, "Medium"]
                  : statusFilter.filter((v) => v !== "Medium")

                setStatusFilter(next)
                table.getColumn("urgency")?.setFilterValue(next)
              }}
            >
              Medium
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("Low")}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...statusFilter, "Low"]
                  : statusFilter.filter((v) => v !== "Low")

                setStatusFilter(next)
                table.getColumn("urgency")?.setFilterValue(next)
              }}
            >
              Low
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="ml-auto" variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add Section</span>
        </Button>
      </div >

      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nothing to do!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>

  )
}




