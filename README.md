# Research.Space Хакатон - Цифровой прорыв ИИ - ЦФО

![system_design.png](/assets%2Fsystem_design.png)

## Team

- `Артем-Дариус Вебер` - NLP ML
- `Юрий Санкин` - Backend
- `Антон Журавлев` - Frontend
- `Далер Хомидов` - Спикер, Капитан, TG Bot Dev

## Deploy

### Backend

### Frontend

### Rasa for production with modified dataset (ML)
> Документация по Rasa для настройки и модификации этого проекта находятся в каждой из дирректорий rasa-**.
```bash
cd rasa-additional
```
#### Console mode - for tests
```bash
pip install rasa && rasa train && rasa shell
```
#### API mode
```bash
docker-compose up
```
OR
```bash
pip install rasa && rasa train && rasa run --enable-api --cors "*" --port 5005
```
### Rasa with only given dataset

```bash
cd rasa
```
#### Console mode - for tests
```bash
pip install rasa && rasa train && rasa shell
```
#### API mode
```bash
docker-compose up
```
OR
```bash
pip install rasa && rasa train && rasa run --enable-api --cors "*" --port 5005
```

### Rasa for Leaderboard (ML)

```bash
cd rasa-leaderboard
```
#### Console mode - for tests
```bash
pip install rasa && rasa train && rasa shell
```
#### API mode
```bash
docker-compose up
```
OR
```bash
pip install rasa && rasa train && rasa run --enable-api --cors "*" --port 5005
```

In the ROOT dir run python script for file.csv processing:

```bash
python leader_board_processing.py
```