import heapq
import sys
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["test"]
collection = db["wikiarticles"]

def get_neighbors(node_id):
    doc = collection.find_one({"title": node_id})
    return doc.get("links", []) if doc else []

def heuristic(current, target):
    # Retourne la différence de longueur entre les titres
    return abs(len(current) - len(target))

def a_star_mongodb(start_id, target_id):
    # Priority queue: (f(n), g(n), current_node, path)
    open_list = []
    heapq.heappush(open_list, (0 + heuristic(start_id, target_id), 0, start_id, [start_id]))
    closed_set = set()
    visited = set([start_id])

    while open_list:
        # Récupère le nœud avec la priorité la plus faible (f(n) = g(n) + h(n))
        n, current_g, current, path = heapq.heappop(open_list)

        # Si on a atteint la cible
        if current == target_id:
            return current_g, path

        closed_set.add(current)

        # On explore les voisins
        for neighbor in get_neighbors(current):
            if neighbor not in closed_set:
                g_neighbor = current_g + 1  # Le coût réel jusqu'au voisin (par exemple, 1 par saut)
                f_neighbor = g_neighbor + heuristic(neighbor, target_id)  # f(n) = g(n) + h(n)

                # Ajouter à la liste d'ouverture si ce nœud n'a pas été exploré
                if neighbor not in visited:
                    heapq.heappush(open_list, (f_neighbor, g_neighbor, neighbor, path + [neighbor]))
                    visited.add(neighbor)

    return float('inf'), []  # Si pas de chemin trouvé

if __name__ == "__main__":
    # Récupérer les paramètres start_id et target_id passés en argument
    if len(sys.argv) != 3:
        print("Usage: python solver.py <start_id> <target_id>")
        sys.exit(1)

    start_id = sys.argv[1]
    target_id = sys.argv[2]

    # Appeler la fonction A* et récupérer la distance et le chemin
    distance, path = a_star_mongodb(start_id, target_id)
    print(f"Distance: {distance}")
    print(f"Path: {path}")
