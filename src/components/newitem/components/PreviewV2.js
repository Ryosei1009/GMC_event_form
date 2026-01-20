import React from 'react'

const PreviewV2 = ({ formData, previewUrl, files, previewUrls }) => {
    // プレビュー画像の取得
    const getPreviewImage = () => {
        if (previewUrl) return previewUrl;
        if (files.basic_image) {
            return URL.createObjectURL(files.basic_image);
        }
        return null;
    };

    const previewImage = getPreviewImage();

    return (
        <div className="flex justify-center pb-16 px-4">
            <div className="max-w-4xl w-full">
                <h2 className="text-3xl font-bold text-center mb-8 text-secondary-800">
                    プレビュー
                </h2>

                {/* インベントリスタイルのプレビュー */}
                <div className="flex justify-center mb-8">
                    <div className="w-80 bg-inventory pb-4 pt-[8rem] pl-4 pr-[22rem] relative rounded-lg shadow-2xl">
                        <div className="w-[147px] h-[141.5px] m-[2px] relative border-[1px] border-black border-opacity-5 bg-item rounded">
                            <div className="max-w-full max-h-full p-[10px]">
                                {previewImage && (
                                    <img
                                        className="block relative mt-2 mb-0 mx-auto w-auto h-auto max-w-[92%] max-h-full"
                                        src={previewImage}
                                        alt="Preview"
                                    />
                                )}
                            </div>
                            <div className="absolute bottom-[10px] left-[10px] text-white font-semibold">
                                1x
                            </div>
                            <div className="absolute top-0 text-white w-full pl-[5px] p-[2.5px] font-semibold">
                                {formData.name || "アイテム名"}
                            </div>
                        </div>
                        <div className="absolute bottom-32 right-4 min-h-12 p-5 w-60 bg-item-content text-white rounded-lg">
                            <div className="pl-1 text-[26px] font-bold tracking-tight">
                                {formData.name || "アイテム名"}
                            </div>
                            <div className="pl-1 text-[15px] font-semibold tracking-tight leading-[18px]">
                                {formData.description || "アイテムの説明"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 詳細情報 */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 mx-4 border border-white/20">
                    <h3 className="text-xl font-bold mb-4 text-secondary-800">📋 申請内容</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 基本情報 */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-lg text-primary-600 border-b border-primary-200 pb-1">基本情報</h4>
                            <div className="space-y-2 text-gray-700">
                                <div className="flex justify-between">
                                    <span className="font-medium">CitizenID:</span>
                                    <span>{formData.citizenid || "未入力"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">アイテム名:</span>
                                    <span>{formData.name || "未入力"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">説明:</span>
                                    <span className="text-right max-w-[200px]">{formData.description || "未入力"}</span>
                                </div>
                            </div>
                        </div>

                        {/* 機能設定 */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-lg text-primary-600 border-b border-primary-200 pb-1">機能設定</h4>
                            <div className="space-y-2 text-gray-700">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">アイテムタイプ:</span>
                                    <span className="text-primary-600 font-semibold">
                                        {formData.is_emote === 0 && formData.is_image === 0 && formData.is_audio === 0 && "📦 基本アイテム"}
                                        {formData.is_emote === 1 && "🕺 エモートアイテム"}
                                        {formData.is_image === 1 && "🖼️ 画像表示アイテム"}
                                        {formData.is_audio === 1 && "🎵 音楽再生アイテム"}
                                    </span>
                                </div>
                                {formData.is_emote === 1 && (
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">エモートID:</span>
                                        <span className={formData.emote ? "text-green-600 font-semibold" : "text-gray-400"}>
                                            {formData.emote ? `/e ${formData.emote}` : "未入力"}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">使用後削除:</span>
                                    <span className={formData.is_remove === 1 ? "text-orange-600 font-semibold" : "text-gray-400"}>
                                        {formData.is_remove === 1 ? "✅ 削除する" : "❌ 削除しない"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 画像プレビュー */}
                    {formData.is_image === 1 && previewUrls?.display_image && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-lg text-primary-600 mb-3">🖼️ 表示画像プレビュー</h4>
                            <img
                                src={previewUrls.display_image}
                                alt="Display Preview"
                                className="max-w-full max-h-64 object-contain border-2 border-primary-300 rounded-lg mx-auto"
                            />
                        </div>
                    )}

                    {/* 音楽プレビュー */}
                    {formData.is_audio === 1 && previewUrls?.audio_file && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-lg text-primary-600 mb-3">🎵 音楽プレビュー</h4>
                            <audio controls className="w-full max-w-md mx-auto block">
                                <source src={previewUrls.audio_file} type="audio/mpeg" />
                            </audio>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PreviewV2