import React from 'react';
import { ArrowUpTrayIcon, ClipboardDocumentListIcon } from '@heroicons/react/20/solid';

const Header = ({ isAdmin }) => {
    return (
        <>
            <header className="glass-effect sticky top-0 z-50 flex justify-between items-center h-20 w-full px-4 md:px-8 text-secondary-800 shadow-elegant">
                <div className="flex items-center">
                    <div className="flex items-center mr-8">
                        <img src="/images/logo.png" alt="GMC Logo" className="md:w-12 md:h-12 w-8 h-8 rounded-lg drop-shadow-md" />
                        <span className="ml-3 text-lg md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                            GMC 2周年イベント
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-1">
                        {!localStorage.getItem('citizenid') && (
                            <a href="/"
                                className="px-4 py-2 rounded-lg text-secondary-700 hover:bg-primary-50 hover:text-primary-600
                                    transition-colors duration-200 font-medium">
                                アイテム申請
                            </a>
                        )}
                        {localStorage.getItem('citizenid') && (
                            <a href="/"
                                className="px-4 py-2 rounded-lg text-secondary-700 hover:bg-primary-50 hover:text-primary-600
                                    transition-colors duration-200 font-medium">
                                申請済みアイテム
                            </a>
                        )}
                        {isAdmin && (
                            <a href="/admin"
                                className="px-4 py-2 rounded-lg text-secondary-700 hover:bg-primary-50 hover:text-primary-600
                                    transition-colors duration-200 font-medium">
                                アドミンページ
                            </a>
                        )}
                    </nav>
                </div>

                {/* モバイルナビ */}
                <div className="flex md:hidden space-x-2">
                    {!localStorage.getItem('citizenid') && (
                        <a href="/"
                            className="p-2 rounded-lg text-secondary-700 hover:bg-primary-50 transition-colors">
                            <ArrowUpTrayIcon className="w-6 h-6" />
                        </a>
                    )}
                    {localStorage.getItem('citizenid') && (
                        <a href="/"
                            className="p-2 rounded-lg text-secondary-700 hover:bg-primary-50 transition-colors">
                            <ClipboardDocumentListIcon className="w-6 h-6" />
                        </a>
                    )}
                    {isAdmin && (
                        <a href="/admin"
                            className="p-2 rounded-lg text-secondary-700 hover:bg-primary-50 transition-colors">
                            ア
                        </a>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;