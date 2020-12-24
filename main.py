import networkx as nx
import matplotlib.pyplot as plt
import numpy as np

G = nx.DiGraph()
G.add_node("CS1200", level=1)
G.add_node("RHET1302", level=1)
G.add_node("060CORE1", level=1)
G.add_node("060CORE2", level=1)
G.add_node("050CORE", level=1)
G.add_node("040CORE", level=1)
G.add_node("ECS1100", level=1)
G.add_node("CS1336", level=1)
G.add_node("CS1337", level=1)
G.add_node("UNIV1010", level=1)
G.add_node("GOVT2305", level=2)
G.add_node("GOVT2306", level=2)
G.add_node("MATH2417", level=2)
G.add_node("MATH2419", level=2)
G.add_node("MATH2418", level=2)
G.add_node("PHYS2325", level=2)
G.add_node("PHYS2326", level=2)
G.add_node("CS2305", level=2)
G.add_node("CS2336", level=2)
G.add_node("ECS2361", level=2)
G.add_node("UNIV2020", level=4)
G.add_node("CS3305", level=3)
G.add_node("CS3340", level=3)
G.add_node("CS3341", level=3)
G.add_node("CS3345", level=3)
G.add_node("CS3377", level=3)
G.add_node("ECS3390", level=3)
G.add_node("CS3354", level=3)
G.add_node("CS3162", level=3)
G.add_node("CS4341", level=4)
G.add_node("CS4337", level=4)
G.add_node("CS4349", level=4)
G.add_node("CS4348", level=4)
G.add_node("CS4384", level=4)
G.add_node("CS4347", level=4)
G.add_node("CS4485", level=4)

# G.add_node("GUIDED ELECTIVE 1")
# G.add_node("GUIDED ELECTIVE 2")
# G.add_node("GUIDED ELECTIVE 3")
#
G.add_node("SCIENCE ELECTIVE", level=1)
#
# G.add_node("FREE ELECTIVE 1")
# G.add_node("FREE ELECTIVE 2")
# G.add_node("FREE ELECTIVE 3")
# G.add_node("FREE ELECTIVE 4")

G.add_edge("ECS1100", "UNIV1010", corequisite="true")

G.add_edge("CS1336", "CS1337", corequisite="false")

G.add_edge("MATH2417", "MATH2419", corequisite="false")
G.add_edge("MATH2417", "PHYS2325", corequisite="false")
G.add_edge("MATH2417", "MATH2418", corequisite="false")

G.add_edge("MATH2419", "PHYS2325", corequisite="true")
G.add_edge("MATH2419", "CS3341", corequisite="false")
G.add_edge("MATH2419", "CS3305", corequisite="false")

G.add_edge("CS1337", "CS2336", corequisite="false")
G.add_edge("CS1337", "CS3340", corequisite="false")

G.add_edge("CS2336", "CS3345", corequisite="false")
G.add_edge("CS2336", "CS3377", corequisite="false")
G.add_edge("CS2336", "CS3354", corequisite="false")
G.add_edge("CS2336", "CS4337", corequisite="false")

G.add_edge("CS3345", "CS3162", corequisite="true")
G.add_edge("CS3345", "CS4348", corequisite="false")
G.add_edge("CS3345", "CS4349", corequisite="false")
G.add_edge("CS3345", "CS4485", corequisite="false")
G.add_edge("CS3345", "CS4347", corequisite="false")

G.add_edge("ECS2361", "CS3162", corequisite="true")

G.add_edge("CS3377", "CS4348", corequisite="false")

G.add_edge("PHYS2325", "PHYS2326", corequisite="false")
G.add_edge("PHYS2325", "ECS2361", corequisite="false")

G.add_edge("PHYS2326", "CS4341", corequisite="false")

G.add_edge("ECS3390", "CS3354", corequisite="true")

G.add_edge("RHET1302", "ECS3390", corequisite="false")

G.add_edge("CS2305", "CS2336", corequisite="true")
G.add_edge("CS2305", "CS3354", corequisite="false")
G.add_edge("CS2305", "CS4337", corequisite="false")
G.add_edge("CS2305", "CS3305", corequisite="false")
G.add_edge("CS2305", "CS3340", corequisite="false")
G.add_edge("CS2305", "CS3341", corequisite="false")
G.add_edge("CS2305", "CS3345", corequisite="false")

G.add_edge("CS3341", "CS3345", corequisite="true")

G.add_edge("CS3305", "CS4349", corequisite="false")
G.add_edge("CS3305", "CS4384", corequisite="false")

G.add_edge("CS3354", "CS3162", corequisite="true")
G.add_edge("CS3354", "CS4485", corequisite="false")

G.add_edge("CS3340", "CS4341", corequisite="false")
G.add_edge("CS3340", "CS4337", corequisite="false")
G.add_edge("CS3340", "CS4348", corequisite="false")

recommendedOrder = list(nx.lexicographical_topological_sort(G, key=lambda x: G.nodes[x]['level']))
transferCredits = ['', '', '', 'CS1336', 'MATH2417', '', '', '']
remainingCourses = [x for x in recommendedOrder if x not in transferCredits]

semesters = np.array_split(remainingCourses, 8)


def isValid(potentialSchedule, G):
    for i in potentialSchedule:
        for j in range(len(i) - 1):
            if G.has_edge(i[j], i[j + 1]) and G[i[j]][i[j + 1]]["corequisite"] == "false":
                return "not valid. Error with " + i[j]
    return "valid"


print(*semesters)

print("This schedule is", isValid(semesters, G))

# for x in temp:
# print(remainingCourses)

# nx.draw(G)
# plt.show()
