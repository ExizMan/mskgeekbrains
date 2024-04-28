from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "Qwen/Qwen1.5-MoE-A2.7B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt")
    response_ids = model.generate(inputs["input_ids"], max_length=100, pad_token_id=tokenizer.eos_token_id)
    return tokenizer.decode(response_ids[0], skip_special_tokens=True)

while True:
    user_input = input("Вы: ")
    if user_input.lower() == "выход":
        break
    prompt = "Задайте вопрос куратору школы: " + user_input
    response = generate_response(prompt)
    print("Куратор школы:", response)
