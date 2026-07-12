import React, { useState } from 'react';
import EmptyState from '../ui/EmptyState';
import { ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react';

export default function DataTable({
  columns = [],
  data = [],
  searchPlaceholder = 'Search records...',
  searchKey = '',
  onAddClick,
  addText = 'Add Record',
  emptyTitle,
  emptyDescription,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter based on search
  const filteredData = data.filter((item) => {
    if (!searchTerm || !searchKey) return true;
    const value = item[searchKey];
    if (!value) return false;
    return String(value).toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Paginate
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search / Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/20 p-4 rounded-xl border border-slate-800 glass-panel">
        {searchKey ? (
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all focus:ring-offset-0"
            />
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {onAddClick && (
          <button
            onClick={onAddClick}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 active:scale-95 rounded-lg transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Plus size={15} />
            {addText}
          </button>
        )}
      </div>

      {/* Table Grid Wrapper with Scroll Boundary */}
      {paginatedData.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={
            onAddClick && (
              <button
                onClick={onAddClick}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors cursor-pointer"
              >
                {addText}
              </button>
            )
          }
        />
      ) : (
        <div className="border border-slate-800 rounded-xl bg-slate-950/30 glass-panel flex flex-col">
          <div className="overflow-x-auto w-full">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-[800px] w-full border-collapse text-left table-fixed">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/65">
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400"
                          style={{ width: col.width || 'auto' }}
                        >
                          {col.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {paginatedData.map((row, rowIndex) => (
                      <tr
                        key={row.id || rowIndex}
                        className="hover:bg-slate-900/40 transition-colors"
                      >
                        {columns.map((col) => (
                          <td key={col.key} className="px-6 py-4 text-sm text-slate-300 truncate">
                            {col.render ? col.render(row) : row[col.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-800 bg-slate-950/20 shrink-0">
              <span className="text-xs text-slate-500 order-2 sm:order-1">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
              </span>
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-medium text-slate-300 px-3">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
