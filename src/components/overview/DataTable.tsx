import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { EVData } from "@/lib/dataAnalysis";

const DataTable = ({ columns, records }: {
    columns: string[];
    records: EVData[];
}) => {
    return (
        <Table>
            <TableCaption>Records based on the filters</TableCaption>
            <TableHeader className="">
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column} className="text-center">
                            {column}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {records.map((record, index) => (
                    <TableRow
                        key={index}
                        className="hover:bg-muted/50 data-[state=selected]:bg-muted/50"
                    >
                        {columns.map((column) => (
                            <TableCell key={column} className="text-center">
                                {record[column]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTable;
