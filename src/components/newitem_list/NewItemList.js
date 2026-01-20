import React, { useEffect, useRef, useState } from 'react'
import EachItem from './EachItem';
import { Helmet } from 'react-helmet';
import Loading from '../utils/Loading';

const NewItemList = ({ token }) => {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCitizenId, setSearchCitizenId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(50);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    async function fetchItemList() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}/event_item/get`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setItemList(data.items || data || []);
        setTotalItems(data.totalItems || data.length || 0);
      } catch (error) {
        console.error('Error fetching item list:', error);
        setItemList([]);
        setTotalItems(0);
      }
      setLoading(false);
    }
    fetchItemList();
  }, [searchCitizenId, searchTerm, statusFilter, currentPage, itemsPerPage]);

  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash.substring(1);
      if (hash && pageRefs.current[hash]) {
        pageRefs.current[hash].scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [loading, itemList]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "none": return { label: "審査中", color: "bg-yellow-100 text-yellow-800" };
      case "add": return { label: "追加済み", color: "bg-green-100 text-green-800" };
      case "cancel": return { label: "却下", color: "bg-red-100 text-red-800" };
      default: return { label: "審査中", color: "bg-yellow-100 text-yellow-800" };
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Helmet
        title="申請一覧 - GMC 2周年イベント"
        meta={[
          { name: 'description', content: 'GMC 2周年イベント アイテム申請一覧' },
          { property: 'og:title', content: '申請一覧 - GMC 2周年イベント' },
        ]}
      />
      <div className="flex justify-center mx-3 py-8">
        <div className="max-w-5xl w-full">
          {/* ヘッダー */}
          <div className="text-center my-16">
            <h1 className="text-4xl font-bold text-secondary-800 mb-2">
              申請一覧
            </h1>
          </div>

          {/* ページネーション（上部） */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mb-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-white/90 rounded-lg disabled:opacity-50 hover:bg-white transition-colors"
              >
                ← 前へ
              </button>
              <span className="px-4 py-2 text-secondary-700 font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-white/90 rounded-lg disabled:opacity-50 hover:bg-white transition-colors"
              >
                次へ →
              </button>
            </div>
          )}

          {/* アイテムリスト */}
          {itemList.length === 0 ? (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-600">申請されたアイテムがありません</p>
            </div>
          ) : (
            <div className="space-y-4">
              {itemList.map((item) => (
                <EachItem
                  key={item.id}
                  item={item}
                  pageRefs={pageRefs}
                  getStatusLabel={getStatusLabel}
                />
              ))}
            </div>
          )}

          {/* ページネーション（下部） */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-white/90 rounded-lg disabled:opacity-50 hover:bg-white transition-colors"
              >
                ← 前へ
              </button>
              <span className="px-4 py-2 text-secondary-700 font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-white/90 rounded-lg disabled:opacity-50 hover:bg-white transition-colors"
              >
                次へ →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default NewItemList