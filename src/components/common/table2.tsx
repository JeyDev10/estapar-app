// export function Table() {
//   return (
//     <TableComponent>
//       <TableHeader>
//         <TableRow>
//           {props.headers.map((header) => (
//             <TableHead key={header.id}>{header.name}</TableHead>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {props.data.map((item, index) => (
//           <TableRow key={item.code}>
//             {props.headers.map((headerItem) => {
//               const columnStyle = headerItem.maxWidth ? `max-w-[${headerItem.maxWidth}px]` : ""

//               return <TableCell className={cn("truncate", columnStyle)}>{item[headerItem.id]}</TableCell>
//             })}
//           </TableRow>
//         ))}
//       </TableBody>
//     </TableComponent>
//   )
// }
