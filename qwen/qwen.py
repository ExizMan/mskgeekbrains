from vllm import LLM, SamplingParams

prompts = [
    "What is AI?",
    "Can you tell me about llamas?",
    "Please solve 291 - 150.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
]
prompt = prompts[1]
system_message = "TEACHER"
prompt_template=f'''system{system_message}user{prompt}assistant'''

prompts = [prompt_template.format(prompt=prompt) for prompt in prompts]

sampling_params = SamplingParams(temperature=0.8, top_p=0.95)

llm = LLM(model="TheBloke/Qwen-7B-Chat-AWQ", quantization="awq", dtype="auto")

outputs = llm.generate(prompts, sampling_params)

# Print the outputs.
for output in outputs:
    prompt = output.prompt
    generated_text = output.outputs[0].text
    print(f"Prompt: {prompt!r}, Generated text: {generated_text!r}")
