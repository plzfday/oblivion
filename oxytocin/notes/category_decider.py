import openai
from django.conf import settings

openai.api_key = settings.API_KEY


def create_gpt_prompt(user_input: str):
    categories = [
        "HTML/CSS/JavaScript",
        "Responsive Web Design",
        "JavaScript Frameworks",
        "State Management",
        "Version Control",
        "Testing",
        "Web Performance Optimization",
        "Backend Programming Languages",
        "Frameworks",
        "Databases",
        "API Development",
        "Authentication/Authorization",
        "Containerization",
        "Cloud Services",
    ]

    prompt = (
        f"Analyse the following input: \"{user_input}\" and choose only one category "
        f"that best fits with the input from the list provided. Return only the name of the "
        f"category without adding anything else. Here are the categories: {', '.join(categories)}"
    )

    return prompt

def get_category_from_gpt(user_input: str):
    messages = [
        {"role": "system", "content": "You are a classification assistant. When given a description, your job is to respond with a single category from a provided list."},
        {"role": "user", "content": create_gpt_prompt(user_input)}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        category_response = response.choices[0].message["content"].strip()
        return category_response
    except openai.error.OpenAIError as e:
        print(f"OpenAI error: {e}")

# # Example usage:
# user_input = "cloud computing is amazing"
# category = get_category_from_gpt(user_input)
# print(f"GPT category response: {category}")


