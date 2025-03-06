#!/bin/bash

echo "Оптимізація зображень..."

# Перевіряємо, чи встановлено imagemagick
if ! command -v convert &> /dev/null; then
    echo "Потрібно встановити ImageMagick. Встановлюємо..."
    apt-get update && apt-get install -y imagemagick
fi

# Створюємо директорію для оптимізованих зображень
mkdir -p public/optimized

# Оптимізуємо всі JPG та PNG файли
for img in public/*.jpg public/*.jpeg public/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename -- "$img")
        echo "Оптимізуємо $filename..."
        
        # Оптимізуємо зображення
        convert "$img" -strip -quality 85% "public/optimized/$filename"
        
        echo "Готово: $filename"
    fi
done

echo "Оптимізація завершена!"
echo "Оптимізовані зображення знаходяться в папці public/optimized/"
echo "Тепер ви можете оновити шляхи до зображень у файлі data/houses.ts"

