from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Static mock data
word_count_data = {
    "Department of Agriculture": 200111,
    "Department of Commerce": 128366,
    "Department of Defense": 372264,
    "Department of Education": 99455,
    "Department of Energy": 173289,
    "Department of Health and Human Services": 288421,
    "Department of Homeland Security": 189004,
    "Department of Housing and Urban Development": 112870,
    "Department of the Interior": 144321,
    "Department of Justice": 209533,
    "Department of Labor": 156702,
    "Department of State": 84567,
    "Department of Transportation": 198776,
    "Department of the Treasury": 224305,
    "Department of Veterans Affairs": 176344,
    "Environmental Protection Agency": 254891,
    "National Aeronautics and Space Administration": 99876,
    "General Services Administration": 112322,
    "National Science Foundation": 70854,
    "Office of Personnel Management": 104439,
    "Small Business Administration": 76245,
    "Social Security Administration": 134322,
    "U.S. Agency for International Development": 54321,
    "Nuclear Regulatory Commission": 108765,
    "Federal Communications Commission": 114567,
    "Federal Trade Commission": 87234,
    "Securities and Exchange Commission": 138999,
    "Commodity Futures Trading Commission": 62891,
    "Consumer Financial Protection Bureau": 101234,
    "National Labor Relations Board": 49500,
    "Equal Employment Opportunity Commission": 61234,
    "Federal Reserve System": 87222,
    "Government Accountability Office": 48321,
    "Library of Congress": 31998,
    "National Archives and Records Administration": 49987,
    "National Endowment for the Arts": 22345,
    "National Endowment for the Humanities": 21456,
    "National Transportation Safety Board": 26789,
    "Office of Special Counsel": 17890,
    "Peace Corps": 12345,
    "U.S. International Trade Commission": 19876,
    "Export-Import Bank of the United States": 23456,
    "Overseas Private Investment Corporation": 20000,
    "Office of the U.S. Trade Representative": 25000,
    "Smithsonian Institution": 29567,
    "Tennessee Valley Authority": 34456,
    "U.S. Postal Service": 38500,
    "White House Office": 12234,
    "U.S. Geological Survey": 30987,
    "Bureau of Alcohol, Tobacco, Firearms and Explosives": 27800
}

regulation_density_data = {
    agency: round(words / 715, 2)  # Fake formula: words divided by ~715 sections
    for agency, words in word_count_data.items()
}

@app.route("/api/word_count")
def get_word_count():
    return jsonify(word_count_data)

@app.route("/api/custom_metric")
def get_custom_metric():
    return jsonify(regulation_density_data)

# ✅ Updated line for production deployment
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
