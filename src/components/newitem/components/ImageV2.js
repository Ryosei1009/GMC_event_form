import React from 'react'

const ImageV2 = ({
    formData,
    handleFileChange,
    displayError,
    uploadError,
    previewUrl,
    setPreviewUrl,
}) => {
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // バリデーション
            if (!file.type.includes('png')) {
                alert('PNG形式の画像を選択してください。');
                event.target.value = '';
                return;
            }

            // ファイルサイズチェック (例: 5MB以下)
            if (file.size > 5 * 1024 * 1024) {
                alert('ファイルサイズが大きすぎます。5MB以下の画像を選択してください。');
                event.target.value = '';
                return;
            }

            // 画像の比率チェック
            const img = new Image();
            img.onload = function() {
                const ratio = this.width / this.height;
                if (Math.abs(ratio - 1) > 0.1) { // 1:1比率の許容誤差10%
                    alert('画像は1:1の比率（正方形）である必要があります。');
                    event.target.value = '';
                    setPreviewUrl(null);
                    return;
                }

                // 300x300以下のチェック
                if (this.width > 300 || this.height > 300) {
                    alert('画像サイズは300x300ピクセル以下である必要があります。');
                    event.target.value = '';
                    setPreviewUrl(null);
                    return;
                }

                // ファイルとプレビューを設定
                handleFileChange('basic_image', file);
                const reader = new FileReader();
                reader.onload = function(e) {
                    setPreviewUrl(e.target.result);
                };
                reader.readAsDataURL(file);
            };

            img.onerror = function() {
                alert('画像ファイルの読み込みに失敗しました。');
                event.target.value = '';
            };

            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative flex flex-col mt-6 bg-white/95 backdrop-blur-sm px-6 py-6 rounded-xl shadow-lg border border-white/20">
            <label className="text-lg font-bold text-secondary-800">
                基本画像<span className="text-red-500"> *</span>
            </label>
            <div className="text-gray-600 text-sm mb-3">インベントリで表示されるアイテム画像</div>

            <input
                type="file"
                accept="image/png"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-100 file:text-purple-700
                    hover:file:bg-purple-200 file:cursor-pointer
                    file:transition-colors"
                id="basic_image"
            />

            {previewUrl && (
                <div className="mt-4 flex justify-center">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">プレビュー:</p>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-32 h-32 object-cover border-2 border-purple-300 rounded-lg shadow-md mx-auto"
                        />
                    </div>
                </div>
            )}

            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-800 font-semibold mb-2">
                    📋 画像要件:
                </p>
                <ul className="text-sm text-purple-700 space-y-1">
                    <li className="flex items-center">
                        <span className="mr-2">✓</span>形式: PNG のみ
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">✓</span>サイズ: 300×300 ピクセル以下
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">✓</span>比率: 1:1 (正方形)
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">✓</span>ファイルサイズ: 5MB 以下
                    </li>
                </ul>
            </div>

            <div className="flex justify-between text-gray-500 mt-1">
                <div className="text-red-500 font-bold text-sm">
                    {displayError && !formData.basic_image && uploadError.basic_image}
                </div>
            </div>
        </div>
    )
}

export default ImageV2