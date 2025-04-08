import heapq
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["test"]
collection = db["wikiarticles"]


def get_neighbors(node_id):
    doc = collection.find_one({"title": node_id})
    print("title", repr(node_id))
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
        n,current_g, current, path = heapq.heappop(open_list)

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

distance, path = a_star_mongodb("Shaft (studio)", "Azote")
print("Distance:", distance)
print("Path:", path)