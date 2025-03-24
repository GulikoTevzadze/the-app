import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersTableView({
  users,
  selectedRows,
  selectAll,
  onRowCheckboxChange,
  onSelectAllChange
}) {
  return (
    <Table className="w-3/4 m-auto mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="text-sky-600 w-16">
            <Checkbox
              checked={selectAll}
              onCheckedChange={onSelectAllChange}
              className="border border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:border-sky-600"
            />
          </TableHead>
          <TableHead className="text-sky-600">Name</TableHead>
          <TableHead className="text-sky-600">Last Name</TableHead>
          <TableHead className="text-sky-600">Email</TableHead>
          <TableHead className="text-sky-600">Status</TableHead>
          <TableHead className="text-sky-600">Last login time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="w-16">
              <Checkbox
                checked={!!selectedRows[row.id]}
                onCheckedChange={() => onRowCheckboxChange(row.id)}
                className="data-[state=checked]:bg-sky-600 data-[state=checked]:border-sky-600"
              />
            </TableCell>
            <TableCell className="text-sky-600">{row.firstName}</TableCell>
            <TableCell className="text-sky-600">{row.lastName}</TableCell>
            <TableCell className="text-sky-600">{row.email}</TableCell>
            <TableCell className="text-sky-600">{row.status}</TableCell>
            <TableCell className="text-sky-600">
              {row.lastLogin}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}