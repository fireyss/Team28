import * as React from "react"
import { type Task } from "@/types/Task"
import taskData from "@/data/taskData.json"
import { type User } from "@/types/Account"
import accountData from "@/data/Accounts.json"
import { type Project } from "@/types/Project"
import projectData from "@/data/projectData.json"

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
  IconSearch,
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

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, parse } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DialogClose } from "@radix-ui/react-dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuth } from "@/context/AuthContext";

const users = accountData as User[]
const projects = projectData as Project[]

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

function DatePicker({ defaultDate }: { defaultDate: Date | undefined }) {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate ? defaultDate : undefined)


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Deadline</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} required />
      </PopoverContent>
    </Popover>
  )
}


const columns: ColumnDef<Task>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger>

            <Button variant="link" className="text-foreground w-fit px-0 text-left">
              {row.original.title}
            </Button>

          </DialogTrigger>
          <DialogContent>
            <div className="w-full max-w-md">
              <form>
                <FieldGroup>
                  <FieldSet>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>
                          Title
                        </FieldLabel>
                        <Input
                          id="title-input"
                          placeholder="Enter task title"
                          defaultValue={row.original.title}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel>
                          Description
                        </FieldLabel>
                        <Textarea
                          id="description-input"
                          placeholder="Enter task description"
                          defaultValue={row.original.description}
                          required
                          className="h-64"
                        />
                      </Field>
                      <div className="grid grid-cols-3 gap-4">
                        <Field>
                          <FieldLabel >
                            Assignee
                          </FieldLabel>
                          <Select defaultValue={users.find(user => user.id === row.original.assignee)?.email}>
                            <SelectTrigger id="assignee-select">
                              <SelectValue placeholder="assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.map(u => {
                                return (<SelectItem value={u.email}>{u.email}</SelectItem>)
                              }
                              )
                              }
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field>
                          <FieldLabel >
                            Status
                          </FieldLabel>
                          <Select defaultValue={row.original.status}>
                            <SelectTrigger id="status-select">
                              <SelectValue placeholder="status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Todo">Todo</SelectItem>
                              <SelectItem value="In Process">In Process</SelectItem>
                              <SelectItem value="In Review">In Review</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field>
                          <FieldLabel >
                            Project
                          </FieldLabel>
                          <Select defaultValue={projects.find(p => p.id === row.original.project)?.title}>
                            <SelectTrigger id="project-select">
                              <SelectValue placeholder="project" />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map(project => {
                                return (<SelectItem value={project.title}>{project.title}</SelectItem>)
                              }
                              )}
                            </SelectContent>
                          </Select>

                        </Field>
                        <Field>
                          <FieldLabel >
                            Urgency
                          </FieldLabel>
                          <Select defaultValue={row.original.urgency}>
                            <SelectTrigger id="urgency-select">
                              <SelectValue placeholder="urgency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <Field>
                        <FieldLabel>
                          Deadline
                        </FieldLabel>
                        <DatePicker defaultDate={parse(row.original.deadline, "dd/MM/yy", new Date())} />
                      </Field>
                      <Field>
                        <FieldLabel>
                          Posted : {row.original.posted}
                        </FieldLabel>
                        <FieldLabel>
                          Completed : {row.original.completed ? row.original.completed : "Not completed"}
                        </FieldLabel>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </form>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Confirm</Button>
              </DialogClose>
            </DialogFooter>
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
      <div className="flex w-fit">
        <Avatar>
          <AvatarImage src={users.find(user => row.original.assignee === user.id)?.avatar} />
          <AvatarFallback className="rounded-lg">{users.find(user => row.original.assignee === user.id)?.email.toUpperCase().substring(0, 2)}</AvatarFallback>
        </Avatar>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {users.find(user => row.original.assignee === user.id)?.email}
        </Badge>
      </div>
    ),
    filterFn: "multipleIncludes" as any,
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

      return <Badge variant="outline" className="text-muted-foreground px-1.5 w-fit">
        {icon}
        {row.original.status}
      </Badge>
    },
    filterFn: "multipleIncludes" as any,
  },
  {
    accessorKey: "project",
    header: () => "Project",
    cell: ({ row }) => {
      return <Badge variant="outline" className="text-muted-foreground px-1.5 w-fit">
        <div>{projects.find(project => project.id == row.original.project)?.title}</div>
      </Badge>
    },
    filterFn: "multipleIncludes" as any,

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
      return <div style={{ color: colour }} className="w-fit">{row.original.urgency}</div>
    },
    filterFn: "multipleIncludes" as any,
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      return <p className="w-fit">{row.original.deadline}</p>

    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-fit data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">



          <Dialog>
            <DialogTrigger>
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                Delete
              </DropdownMenuItem>
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
                  <Button type="submit">Confirm</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<Task> }) {
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

export function DataTable() {
  let initialData = taskData as Task[]

  let user = useAuth().user!
  if (user.permission != "Manager") {
    initialData = initialData.filter(task => projects.find(project => task.project === project.id)?.members.includes(user!.id)
    )
  }

  const [data, setData] = React.useState<Task[]>(initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [statusFilter, setStatusFilter] = React.useState<any[]>([])
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

  function DropdownFilter({ column, value, label }: { column: string, value: any, label: any }) {
    return (<DropdownMenuCheckboxItem
      checked={statusFilter.includes(value)}
      onCheckedChange={(checked) => {
        const next = checked
          ? [...statusFilter, value]
          : statusFilter.filter((v) => v !== value)

        setStatusFilter(next)
        table.getColumn(column)?.setFilterValue(next)
      }}
    >
      {label}
    </DropdownMenuCheckboxItem>
    )
  }

  return (
    <>
      <div className="flex items-center py-4 gap-2">
        <InputGroup className="ml-5 max-w-sm">
          <InputGroupInput

            placeholder="Search titles..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }

          />
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
        </InputGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Assignee</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {users.map(u => {
              return (
                <DropdownFilter column="assignee" value={u.id} label={u.email} />
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownFilter column="status" value="Todo" label="Todo" />
            <DropdownFilter column="status" value="In Process" label="In Process" />
            <DropdownFilter column="status" value="In Review" label="In Review" />
            <DropdownFilter column="status" value="Done" label="Done" />
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Project</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {projects.map(p =>
              <DropdownFilter column="project" value={p.id} label={p.title} />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Urgency</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownFilter column="urgency" value="High" label="High" />
            <DropdownFilter column="urgency" value="Medium" label="Medium" />
            <DropdownFilter column="urgency" value="Low" label="Low" />
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger>

            <Button size="sm" className="ml-auto">
              <IconPlus />
              <span className="hidden lg:inline">Add Section</span>
            </Button>


          </DialogTrigger>
          <DialogContent>
            <div className="w-full max-w-md">
              <form>
                <FieldGroup>
                  <FieldSet>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>
                          Title
                        </FieldLabel>
                        <Input
                          id="title-input"
                          placeholder="Enter task title"

                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel>
                          Description
                        </FieldLabel>
                        <Textarea
                          id="description-input"
                          placeholder="Enter task description"

                          required
                          className="h-64"
                        />
                      </Field>
                      <div className="grid grid-cols-3 gap-4">
                        <Field>
                          <FieldLabel >
                            Assignee
                          </FieldLabel>
                          <Select>
                            <SelectTrigger id="assignee-select">
                              <SelectValue placeholder="assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.map(u => {
                                return (<SelectItem value={u.email}>{u.email}</SelectItem>)
                              }
                              )
                              }
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field>
                          <FieldLabel >
                            Status
                          </FieldLabel>
                          <Select>
                            <SelectTrigger id="status-select">
                              <SelectValue placeholder="status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Todo">Todo</SelectItem>
                              <SelectItem value="In Process">In Process</SelectItem>
                              <SelectItem value="In Review">In Review</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field>
                          <FieldLabel >
                            Project
                          </FieldLabel>
                          <Select>
                            <SelectTrigger id="project-select">
                              <SelectValue placeholder="project" />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map(p =>
                                <SelectItem value={p.title}>{p.title}</SelectItem>
                              )}
                              {/* <SelectItem ></SelectItem> */}
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field>
                          <FieldLabel >
                            Urgency
                          </FieldLabel>
                          <Select>
                            <SelectTrigger id="urgency-select">
                              <SelectValue placeholder="urgency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <Field>
                        <FieldLabel>
                          Deadline
                        </FieldLabel>
                        <DatePicker defaultDate={undefined} />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </form>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Confirm</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>


      </div >

      <div className="m-5 overflow-hidden rounded-lg border">
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





